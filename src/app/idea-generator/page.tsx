"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import {
  FaPlus,
  FaStickyNote,
  FaPencilAlt,
  FaEraser,
  FaSave,
  FaTrash,
  FaVoteYea,
  FaPlay,
  FaStopCircle,
  FaThumbsUp,
  FaUsers,
  FaLink,
} from "react-icons/fa";

// Types
type Note = {
  id: string;
  text: string;
  position: { x: number; y: number };
  color: string;
  votes: number;
  clusterId: string | null;
};

type Cluster = {
  id: string;
  name: string;
  notes: string[];
};

type DrawingMode = "select" | "draw" | "erase";

const BrainstormingBoard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("select");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [presentationMode, setPresentationMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001"); // Replace with your Socket.IO server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 2;
        contextRef.current = context;
      }
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("updateNotes", (updatedNotes: Note[]) => {
        setNotes(updatedNotes);
      });

      socket.on("updateClusters", (updatedClusters: Cluster[]) => {
        setClusters(updatedClusters);
      });

      socket.on("updateActiveUsers", (users: string[]) => {
        setActiveUsers(users);
      });

      socket.on("drawLine", ({ x0, y0, x1, y1 }) => {
        if (contextRef.current) {
          contextRef.current.beginPath();
          contextRef.current.moveTo(x0, y0);
          contextRef.current.lineTo(x1, y1);
          contextRef.current.stroke();
        }
      });
    }
  }, [socket]);

  const addNote = useCallback(() => {
    const newNote: Note = {
      id: uuidv4(),
      text: "",
      position: { x: Math.random() * 500, y: Math.random() * 300 },
      color: getRandomColor(),
      votes: 0,
      clusterId: null,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    socket?.emit("addNote", newNote);
  }, [socket]);

  const updateNote = useCallback(
    (id: string, text: string) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...note, text } : note))
      );
      socket?.emit("updateNotes", notes);
    },
    [notes, socket]
  );

  const moveNote = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...note, position } : note))
      );
      socket?.emit("updateNotes", notes);
    },
    [notes, socket]
  );

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      socket?.emit("updateNotes", notes);
    },
    [notes, socket]
  );

  const voteForNote = useCallback(
    (id: string) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, votes: note.votes + 1 } : note
        )
      );
      socket?.emit("updateNotes", notes);
    },
    [notes, socket]
  );

  const createCluster = useCallback(() => {
    const newCluster: Cluster = {
      id: uuidv4(),
      name: "New Cluster",
      notes: [],
    };
    setClusters((prevClusters) => [...prevClusters, newCluster]);
    socket?.emit("updateClusters", clusters);
  }, [clusters, socket]);

  const addNoteToCluster = useCallback(
    (noteId: string, clusterId: string) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, clusterId } : note
        )
      );
      setClusters((prevClusters) =>
        prevClusters.map((cluster) =>
          cluster.id === clusterId
            ? { ...cluster, notes: [...cluster.notes, noteId] }
            : cluster
        )
      );
      socket?.emit("updateNotes", notes);
      socket?.emit("updateClusters", clusters);
    },
    [notes, clusters, socket]
  );

  const removeNoteFromCluster = useCallback(
    (noteId: string) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, clusterId: null } : note
        )
      );
      setClusters((prevClusters) =>
        prevClusters.map((cluster) => ({
          ...cluster,
          notes: cluster.notes.filter((id) => id !== noteId),
        }))
      );
      socket?.emit("updateNotes", notes);
      socket?.emit("updateClusters", clusters);
    },
    [notes, clusters, socket]
  );

  const startDrawing = useCallback(({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
    }
  }, []);

  const draw = useCallback(
    ({ nativeEvent }) => {
      if (!contextRef.current) return;
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      socket?.emit("drawLine", {
        x0: offsetX,
        y0: offsetY,
        x1: offsetX,
        y1: offsetY,
      });
    },
    [socket]
  );

  const togglePresentationMode = useCallback(() => {
    setPresentationMode((prev) => !prev);
    setCurrentSlide(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % (notes.length + 1));
  }, [notes.length]);

  const previousSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + notes.length + 1) % (notes.length + 1)
    );
  }, [notes.length]);

  const getRandomColor = () => {
    const colors = ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Header />
      <Head>
        <title>Ideju ģenerēšanas platforma - Radošuma veicināšanai</title>
        <meta
          name="description"
          content="Digitāla tāfele ideju ģenerēšanai, prāta karšu veidošanai un reāllaika sadarbībai. Ietver līmlapiņas, brīvrokas zīmēšanu un ideju organizēšanu klasteros."
        />
        <meta
          name="keywords"
          content="ideju ģenerēšana, prāta kartes, radošums, sadarbība, digitālā tāfele, līmlapiņas, brīvrokas zīmēšana"
        />
        <link rel="canonical" href="https://jusu-domena.lv/ideju-generesana" />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-2">
          Ideju ģenerēšanas platforma
        </h1>
        <p className="text-xl text-center mb-8">
          Radiet, organizējiet un attīstiet savas idejas kopā ar komandu
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <button
                onClick={addNote}
                className="mr-2 p-2 bg-blue-500 text-white rounded"
              >
                <FaStickyNote className="mr-1 inline" /> Pievienot ideju
              </button>
              <button
                onClick={createCluster}
                className="p-2 bg-green-500 text-white rounded"
              >
                <FaLink className="mr-1 inline" /> Izveidot klasteru
              </button>
            </div>
            <div>
              <button
                onClick={() => setDrawingMode("draw")}
                className={`p-2 ${
                  drawingMode === "draw" ? "bg-gray-300" : "bg-gray-100"
                } rounded mr-2`}
              >
                <FaPencilAlt className="mr-1 inline" /> Zīmēt
              </button>
              <button
                onClick={() => setDrawingMode("erase")}
                className={`p-2 ${
                  drawingMode === "erase" ? "bg-gray-300" : "bg-gray-100"
                } rounded mr-2`}
              >
                <FaEraser className="mr-1 inline" /> Dzēst
              </button>
              <button
                onClick={togglePresentationMode}
                className="p-2 bg-purple-500 text-white rounded"
              >
                {presentationMode ? (
                  <FaStopCircle className="mr-1 inline" />
                ) : (
                  <FaPlay className="mr-1 inline" />
                )}
                {presentationMode ? "Beigt prezentāciju" : "Sākt prezentāciju"}
              </button>
            </div>
          </div>

          <div className="relative h-[600px] border border-gray-300 rounded">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              className="absolute inset-0 w-full h-full"
            />
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    position: "absolute",
                    left: note.position.x,
                    top: note.position.y,
                    backgroundColor: note.color,
                  }}
                  className="w-40 h-40 p-2 rounded shadow-md cursor-move"
                  drag
                  dragMomentum={false}
                  onDragEnd={(e, info) =>
                    moveNote(note.id, { x: info.point.x, y: info.point.y })
                  }
                >
                  <textarea
                    value={note.text}
                    onChange={(e) => updateNote(note.id, e.target.value)}
                    className="w-full h-full bg-transparent resize-none focus:outline-none"
                    placeholder="Ierakstiet savu ideju šeit..."
                  />
                  <div className="absolute bottom-1 left-1 right-1 flex justify-between items-center">
                    <button
                      onClick={() => voteForNote(note.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaThumbsUp /> {note.votes}
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Klasteri</h3>
            <div className="flex flex-wrap gap-2">
              {clusters.map((cluster) => (
                <div key={cluster.id} className="bg-gray-100 p-2 rounded">
                  <input
                    value={cluster.name}
                    onChange={(e) => {
                      const updatedClusters = clusters.map((c) =>
                        c.id === cluster.id ? { ...c, name: e.target.value } : c
                      );
                      setClusters(updatedClusters);
                      socket?.emit("updateClusters", updatedClusters);
                    }}
                    className="bg-transparent border-b border-gray-300 focus:outline-none"
                  />
                  <span className="ml-2">({cluster.notes.length})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Aktīvie lietotāji</h3>
            <div className="flex items-center">
              <FaUsers className="mr-2" />
              {activeUsers.join(", ")}
            </div>
          </div>
        </div>

        {presentationMode && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
              {currentSlide === 0 ? (
                <h2 className="text-3xl font-bold mb-4">Ideju prezentācija</h2>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-4">
                    {notes[currentSlide - 1].text}
                  </h3>
                  <p className="text-lg mb-2">
                    Balsis: {notes[currentSlide - 1].votes}
                  </p>
                  <p className="text-gray-600">
                    Ideja #{currentSlide} no {notes.length}
                  </p>
                </>
              )}
              <div className="flex justify-between mt-8">
                <button
                  onClick={previousSlide}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Iepriekšējā
                </button>
                <button
                  onClick={nextSlide}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Nākamā
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-200 p-4 text-center mt-8">
        <p>
          © {new Date().getFullYear()} Ideju ģenerēšanas platforma. Visas
          tiesības aizsargātas.
        </p>
      </footer>
    </div>
  );
};

export default BrainstormingBoard;
