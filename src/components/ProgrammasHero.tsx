import React, { useState, useEffect } from "react";
import styles from "./ProgrammasHero.module.css";

interface User {
  id: string;
  name: string;
}

interface Task {
  id: string;
  content: string;
  category?: string;
  assignedTo?: string;
}

interface Event {
  id: string;
  content: string;
  day: number;
  time: string;
  category?: string;
}

const initialUsers: User[] = [
  { id: "user1", name: "Jānis Bērziņš" },
  { id: "user2", name: "Santa Liepiņa" },
];

const initialTasks: Task[] = [
  { id: "task1", content: "Dizaina onboardings", category: "Šonedēļ" },
  {
    id: "task2",
    content: "Rakstīt darbā pieņemšanas kritērijus",
    category: "Šonedēļ",
  },
  { id: "task3", content: "Publicēt emuāra ierakstu", category: "Šonedēļ" },
  { id: "task4", content: "Rezervēt sanāksmes telpu", category: "Šonedēļ" },
  { id: "task5", content: "Iestatīt Zapier integrāciju", category: "Šonedēļ" },
  {
    id: "task6",
    content: "Pirkt vairāk kafijas filtrus",
    category: "Personīgi",
  },
  { id: "task7", content: "Atcelt Disney+", category: "Personīgi" },
  { id: "task8", content: "Ziedot Unica", category: "Personīgi" },
];

const initialEvents: Event[] = [
  {
    id: "event1",
    content: "Pirmdienas sinhronizācija",
    day: 7,
    time: "9:00",
    category: "work",
  },
  {
    id: "event2",
    content: "Iknedēļas dizains",
    day: 7,
    time: "10:02",
    category: "personal",
  },
  {
    id: "event3",
    content: "Pusdienu pārtraukums",
    day: 7,
    time: "12:00",
    category: "break",
  },
  {
    id: "event4",
    content: "E-pasti",
    day: 7,
    time: "13:00",
    category: "personal",
  },
  {
    id: "event5",
    content: "Dizaina onboardings",
    day: 8,
    time: "10:00",
    category: "work",
  },
  {
    id: "event6",
    content: "Pusdienu pārtraukums",
    day: 8,
    time: "12:00",
    category: "break",
  },
  {
    id: "event7",
    content: "Easttown projekts",
    day: 8,
    time: "14:00",
    category: "work",
  },
  {
    id: "event8",
    content: "Emuāra ieraksts",
    day: 9,
    time: "10:30",
    category: "personal",
  },
  {
    id: "event9",
    content: "Pusdienu pārtraukums",
    day: 9,
    time: "12:00",
    category: "break",
  },
  {
    id: "event10",
    content: "Rezervēts intervijai",
    day: 9,
    time: "13:00",
    category: "work",
  },
  {
    id: "event11",
    content: "Rezervēt sanāksmes telpu",
    day: 10,
    time: "8:45",
    category: "work",
  },
  {
    id: "event12",
    content: "Pusdienu pārtraukums",
    day: 10,
    time: "12:00",
    category: "break",
  },
  {
    id: "event13",
    content: "Rakstīt ziņas",
    day: 10,
    time: "13:00",
    category: "personal",
  },
  {
    id: "event14",
    content: "Dizainēt mūsu mājaslapu",
    day: 10,
    time: "14:00",
    category: "work",
  },
  {
    id: "event15",
    content: "Kino",
    day: 11,
    time: "10:30",
    category: "personal",
  },
  {
    id: "event16",
    content: "Veļas mazgāšana",
    day: 11,
    time: "10:30",
    category: "personal",
  },
  {
    id: "event17",
    content: "Pusdienu pārtraukums",
    day: 11,
    time: "12:00",
    category: "break",
  },
  {
    id: "event18",
    content: "Randiņa vakars",
    day: 11,
    time: "13:30",
    category: "personal",
  },
  {
    id: "event19",
    content: "Deadpool",
    day: 11,
    time: "13:00",
    category: "personal",
  },
];

const ProgrammasHero: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [tasks, setTasks] = useState(initialTasks);
  const [events, setEvents] = useState(initialEvents);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [newUserName, setNewUserName] = useState("");
  const [newTaskContent, setNewTaskContent] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const onDragStart = (event: React.DragEvent, taskId: string) => {
    event.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = (event: React.DragEvent, day: number) => {
    const taskId = event.dataTransfer.getData("taskId");
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const newEvent: Event = {
        ...task,
        day,
        id: `event-${task.id}-${day}`,
        time: "10:00", // Default time
      };
      setEvents([...events, newEvent]);
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const addUser = () => {
    if (newUserName.trim()) {
      setUsers([
        ...users,
        { id: `user${users.length + 1}`, name: newUserName.trim() },
      ]);
      setNewUserName("");
    }
  };

  const removeUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
    setTasks(tasks.filter((task) => task.assignedTo !== userId));
  };

  const addTask = () => {
    if (newTaskContent.trim() && selectedUser) {
      setTasks([
        ...tasks,
        {
          id: `task${tasks.length + 1}`,
          content: newTaskContent.trim(),
          category: "Šonedēļ",
          assignedTo: selectedUser,
        },
      ]);
      setNewTaskContent("");
    }
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const moveTask = (taskId: string, direction: "up" | "down") => {
    const index = tasks.findIndex((task) => task.id === taskId);
    if (
      (direction === "up" && index > 0) ||
      (direction === "down" && index < tasks.length - 1)
    ) {
      const newTasks = [...tasks];
      const temp = newTasks[index];
      newTasks[index] = newTasks[index + (direction === "up" ? -1 : 1)];
      newTasks[index + (direction === "up" ? -1 : 1)] = temp;
      setTasks(newTasks);
    }
  };

  const renderTaskList = (category: string) => (
    <div className={styles.taskList}>
      <h3>{category}</h3>
      <ul>
        {tasks
          .filter((task) => task.category === category)
          .map((task, index) => (
            <li
              key={task.id}
              draggable
              onDragStart={(event) => onDragStart(event, task.id)}
              className={styles.task}
            >
              <input type="checkbox" className={styles.taskCheckbox} />
              <span className={styles.taskContent}>{task.content}</span>
              {task.assignedTo && (
                <span className={styles.assignedTo}>
                  {users.find((u) => u.id === task.assignedTo)?.name}
                </span>
              )}
              <div className={styles.taskActions}>
                <button
                  onClick={() => removeTask(task.id)}
                  className={styles.removeButton}
                  aria-label="Remove task"
                >
                  ×
                </button>
                <button
                  onClick={() => moveTask(task.id, "up")}
                  className={styles.moveButton}
                  aria-label="Move task up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveTask(task.id, "down")}
                  className={styles.moveButton}
                  aria-label="Move task down"
                >
                  ↓
                </button>
              </div>
            </li>
          ))}
      </ul>
      <button className={styles.addTask}>+ Uzdevums</button>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Uzdevumi</h2>
        <div className={styles.currentDateTime}>
          {currentDateTime.toLocaleString("lv-LV", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
        <div className={styles.userManagement}>
          <h3>Lietotāji</h3>
          <ul className={styles.userList}>
            {users.map((user) => (
              <li key={user.id} className={styles.userItem}>
                <span className={styles.userName}>{user.name}</span>
                <button
                  onClick={() => removeUser(user.id)}
                  className={styles.removeButton}
                  aria-label="Remove user"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.addUserForm}>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Jauns lietotājs"
              className={styles.inputText}
            />
            <button onClick={addUser} className={styles.addButton}>
              + Pievienot
            </button>
          </div>
        </div>
        <div className={styles.taskManagement}>
          <h3>Pievienot uzdevumu</h3>
          <input
            type="text"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            placeholder="Jauns uzdevums"
            className={styles.inputText}
          />
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className={styles.selectDropdown}
          >
            <option value="">Izvēlieties lietotāju</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button onClick={addTask} className={styles.addButton}>
            + Pievienot uzdevumu
          </button>
        </div>
        {renderTaskList("Šonedēļ")}
        {renderTaskList("Personīgi")}
        <div className={styles.booksToRead}>
          <h3>Grāmatas, ko lasīt</h3>
          <button className={styles.addBook}>+ Grāmata</button>
        </div>
        <div className={styles.pricing}>
          <h3>Profesionāls</h3>
          <p className={styles.price}>
            $10 <span>par lietotāju mēnesī</span>
          </p>
          <ul>
            <li>Neierobežota vēsture</li>
            <li>Neierobežotas koplietošanas saites</li>
          </ul>
        </div>
      </div>
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <h2>Marts 2022</h2>
          <div className={styles.calendarControls}>
            <button className={styles.controlButton}>←</button>
            <button className={styles.controlButton}>→</button>
            <select className={styles.selectDropdown}>
              <option>N9</option>
            </select>
            <button className={styles.todayButton}>Šodien</button>
            <button className={styles.shareButton}>Kopīgot</button>
          </div>
        </div>
        <div className={styles.weekdays}>
          {[
            "Pirmdiena",
            "Otrdiena",
            "Trešdiena",
            "Ceturtdiena",
            "Piektdiena",
          ].map((day) => (
            <div key={day} className={styles.weekday}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.days}>
          {[7, 8, 9, 10, 11].map((day) => (
            <div
              key={day}
              onDrop={(event) => onDrop(event, day)}
              onDragOver={onDragOver}
              className={styles.day}
            >
              <span className={styles.dayNumber}>{day}</span>
              <div className={styles.eventList}>
                {events
                  .filter((event) => event.day === day)
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`${styles.event} ${
                        styles[event.category || ""]
                      }`}
                    >
                      <span className={styles.eventTime}>{event.time}</span>
                      <span className={styles.eventContent}>
                        {event.content}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgrammasHero;
