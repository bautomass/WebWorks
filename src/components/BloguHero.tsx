import React, { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  Info,
  Mail,
  Settings,
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  Eye,
  Tag,
  Calendar,
  MessageCircle,
  Share2,
  Heart,
  Menu,
  X,
  Bell,
  User,
  LayoutGrid,
  List,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  AlertCircle,
  Filter,
  Settings2,
  Bookmark,
  FileText,
  Users,
  BarChart2,
  Book,
  Star,
  Clock,
  Phone,
  MapPin,
} from "lucide-react";

// Mock data with expanded content
const MOCK_POSTS = [
  {
    id: 1,
    title: "Modernā Tīmekļa Izstrāde 2024. gadā",
    category: "Izstrāde",
    views: 1523,
    likes: 256,
    comments: 43,
    excerpt:
      "Uzziniet par jaunākajām tehnoloģijām un tendencēm, kas definē mūsdienu tīmekļa izstrādi. No React 19 līdz WebAssembly.",
    image: "/api/placeholder/800/600",
    date: "2024-03-15",
    readTime: "8 min",
    author: "Jānis Bērziņš",
    tags: ["React", "Web Development", "JavaScript"],
    featured: true,
  },
  {
    id: 2,
    title: "SEO Optimizācijas Pamati",
    category: "Mārketings",
    views: 892,
    likes: 178,
    comments: 27,
    excerpt:
      "Pamata SEO stratēģijas un to praktiska pielietošana mūsdienu tīmekļa vietnēs.",
    image: "/api/placeholder/800/600",
    date: "2024-03-14",
    readTime: "6 min",
    author: "Anna Kļaviņa",
    tags: ["SEO", "Marketing"],
  },
  {
    id: 3,
    title: "UX Dizaina Principi",
    category: "Dizains",
    views: 734,
    likes: 145,
    comments: 19,
    excerpt: "Modernā lietotāju pieredzes dizaina principi un labākās prakses.",
    image: "/api/placeholder/800/600",
    date: "2024-03-13",
    readTime: "7 min",
    author: "Pēteris Ozols",
    tags: ["UX", "Design"],
  },
  {
    id: 4,
    title: "Mākslīgais Intelekts Web Izstrādē",
    category: "Tehnoloģijas",
    views: 1245,
    likes: 312,
    comments: 56,
    excerpt: "Kā izmantot AI rīkus un tehnoloģijas modernā web izstrādē.",
    image: "/api/placeholder/800/600",
    date: "2024-03-12",
    readTime: "10 min",
    author: "Linda Zariņa",
    tags: ["AI", "Technology"],
    featured: true,
  },
];

const CATEGORIES = [
  { id: "izstrade", name: "Izstrāde", count: 12 },
  { id: "marketings", name: "Mārketings", count: 8 },
  { id: "dizains", name: "Dizains", count: 7 },
  { id: "tehnologijas", name: "Tehnoloģijas", count: 5 },
];

// Stats for home page
const SITE_STATS = {
  totalPosts: 156,
  totalAuthors: 12,
  totalComments: 1234,
  totalViews: 45678,
};

// Recent activities for admin panel
const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: "comment",
    user: "Jānis K.",
    action: "pievienoja komentāru",
    target: "Modernā Tīmekļa Izstrāde 2024. gadā",
    time: "pirms 5 min",
  },
  {
    id: 2,
    type: "post",
    user: "Anna L.",
    action: "izveidoja jaunu rakstu",
    target: "SEO Pamati Iesācējiem",
    time: "pirms 1 h",
  },
  // Add more activities...
];

const BlogSystem: React.FC = () => {
  // State management
  const [activePage, setActivePage] = useState<
    "sakums" | "blogs" | "admin" | "par" | "kontakti"
  >("sakums");
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDemoCard, setShowDemoCard] = useState(true);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const [activeMainTab, setActiveMainTab] = useState<
    "feed" | "latest" | "trending"
  >("feed");

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsMenuOpen(width >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "k":
            e.preventDefault();
            document.querySelector('input[type="text"]')?.focus();
            break;
          case "n":
            e.preventDefault();
            alert("Jauna raksta izveide (Demo)");
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // HomePage Component
  const HomePage = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10"></div>
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Web Works Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Jaunākās tendences un padomi web izstrādē, dizainā un digitālajā
            mārketingā.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setActivePage("blogs")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sākt Lasīt
            </button>
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Uzzināt Vairāk
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Raksti", value: SITE_STATS.totalPosts, icon: <FileText /> },
          { label: "Autori", value: SITE_STATS.totalAuthors, icon: <Users /> },
          {
            label: "Komentāri",
            value: SITE_STATS.totalComments,
            icon: <MessageCircle />,
          },
          { label: "Skatījumi", value: SITE_STATS.totalViews, icon: <Eye /> },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Posts */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Populārākie Raksti
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {MOCK_POSTS.filter((post) => post.featured).map((post) => (
            <div key={post.id} className="p-6 flex items-start space-x-4">
              <div className="w-20 h-20 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Book className="text-indigo-600" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle size={16} />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // AboutPage Component
  const AboutPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Par Web Works</h1>
        <p className="text-lg text-gray-600 mb-6">
          Web Works ir vadošā platforma web izstrādes zināšanu apmaiņai Latvijā.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Mūsu Misija",
              content: "Nodrošināt aktuālāko informāciju par web tehnoloģijām.",
              icon: <Star className="text-indigo-600" size={24} />,
            },
            {
              title: "Mūsu Vīzija",
              content: "Kļūt par vadošo digitālo zināšanu centru Baltijā.",
              icon: <Eye className="text-indigo-600" size={24} />,
            },
            {
              title: "Mūsu Vērtības",
              content: "Kvalitāte, inovācija un atvērtība jaunām idejām.",
              icon: <Heart className="text-indigo-600" size={24} />,
            },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mūsu Komanda</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Jānis Bērziņš",
              role: "Galvenais Redaktors",
              image: "/api/placeholder/100/100",
            },
            {
              name: "Anna Kļaviņa",
              role: "Satura Vadītāja",
              image: "/api/placeholder/100/100",
            },
            {
              name: "Pēteris Ozols",
              role: "Tehniskais Direktors",
              image: "/api/placeholder/100/100",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 rounded-full bg-indigo-100 mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  // ContactPage Component
  const ContactPage = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sazinies ar mums
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vārds un Uzvārds
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ievadiet vārdu un uzvārdu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-pasta Adrese
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="jusu@epasts.lv"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tēma
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option>Vispārīgs jautājums</option>
                  <option>Tehniskā palīdzība</option>
                  <option>Sadarbības piedāvājums</option>
                  <option>Cits</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ziņojums
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Jūsu ziņojums..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Nosūtīt Ziņojumu
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Kontaktinformācija
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-indigo-600" size={20} />
                  <span className="text-gray-600">info@webworks.lv</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-indigo-600" size={20} />
                  <span className="text-gray-600">+371 2000 0000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-indigo-600" size={20} />
                  <span className="text-gray-600">Rīga, Latvija, LV-1001</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Darba Laiks
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Pirmdiena - Piektdiena: 9:00 - 18:00</p>
                <p>Sestdiena - Svētdiena: Slēgts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // AdminPanel Component
  const AdminPanel = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Administrācijas Panelis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-indigo-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600 font-medium">
                  Kopējie Raksti
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {MOCK_POSTS.length}
                </p>
              </div>
              <FileText className="text-indigo-600" size={24} />
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">
                  Aktīvie Lietotāji
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">842</p>
              </div>
              <Users className="text-purple-600" size={24} />
            </div>
          </div>

          <div className="bg-pink-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-pink-600 font-medium">Komentāri</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">1.2K</p>
              </div>
              <MessageCircle className="text-pink-600" size={24} />
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Skatījumi</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">45.2K</p>
              </div>
              <BarChart2 className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Pēdējās Aktivitātes
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {RECENT_ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // BlogPost Component - Enhanced version
  const BlogPost = ({ post }: { post: (typeof MOCK_POSTS)[0] }) => (
    <article
      className={`
    bg-white rounded-xl shadow-sm overflow-hidden
    transition-all duration-300 hover:shadow-lg
    ${viewMode === "grid" ? "" : "flex md:items-center"}
    ${post.featured ? "ring-2 ring-indigo-500 ring-offset-2" : ""}
  `}
    >
      <div
        className={`relative ${
          viewMode === "grid" ? "w-full" : "w-1/3 flex-shrink-0"
        }`}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        {post.featured && (
          <div className="absolute top-2 left-2 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full flex items-center">
            <Star className="w-3 h-3 mr-1" />
            Populārs
          </div>
        )}
        <div className="absolute bottom-2 right-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setBookmarkedPosts((prev) =>
                prev.includes(post.id)
                  ? prev.filter((id) => id !== post.id)
                  : [...prev, post.id]
              );
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
          >
            <Bookmark
              size={16}
              className={
                bookmarkedPosts.includes(post.id)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-600"
              }
            />
          </button>
        </div>
      </div>

      <div className={`p-6 ${viewMode === "grid" ? "" : "flex-1"}`}>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full">
            {post.category}
          </span>
          <span className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            {post.readTime}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLikedPosts((prev) =>
                  prev.includes(post.id)
                    ? prev.filter((id) => id !== post.id)
                    : [...prev, post.id]
                );
              }}
              className="flex items-center gap-1 group"
            >
              <Heart
                size={16}
                className={`transition-colors ${
                  likedPosts.includes(post.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 group-hover:text-red-500"
                }`}
              />
              <span
                className={
                  likedPosts.includes(post.id)
                    ? "text-red-500"
                    : "text-gray-500"
                }
              >
                {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
              </span>
            </button>

            <div className="flex items-center gap-1 text-gray-500">
              <MessageCircle size={16} />
              <span>{post.comments}</span>
            </div>

            <div className="flex items-center gap-1 text-gray-500">
              <Eye size={16} />
              <span>{post.views}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 size={16} className="text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ExternalLink size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <User size={14} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {post.author}
                </p>
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
        h-screen bg-gradient-to-b from-indigo-600 to-indigo-800
        transition-all duration-300 ease-in-out
        fixed lg:sticky top-0 left-0
        ${isMenuOpen ? "w-64" : "w-20"}
        ${isMobile && !isMenuOpen ? "-translate-x-full" : "translate-x-0"}
        flex flex-col
        z-30
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-indigo-500/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <BookOpen size={24} className="text-indigo-600" />
              </div>
              <h1
                className={`text-white font-bold text-xl transition-opacity duration-300 
                ${isMenuOpen ? "opacity-100" : "opacity-0 hidden lg:block"}`}
              >
                Web Works
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            {[
              { icon: <Home size={22} />, text: "Sākums", id: "sakums" },
              { icon: <BookOpen size={22} />, text: "Raksti", id: "blogs" },
              { icon: <Info size={22} />, text: "Par Mums", id: "par" },
              { icon: <Mail size={22} />, text: "Kontakti", id: "kontakti" },
              {
                icon: <Settings size={22} />,
                text: "Administrācija",
                id: "admin",
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id as any);
                  isMobile && setIsMenuOpen(false);
                }}
                className={`
                  w-full flex items-center px-3 py-3 mb-2 rounded-xl
                  transition-all duration-200
                  ${
                    activePage === item.id
                      ? "bg-white text-indigo-600 shadow-lg"
                      : "text-white hover:bg-indigo-500"
                  }
                  ${
                    isMenuOpen
                      ? "justify-start"
                      : "justify-center lg:justify-start"
                  }
                `}
              >
                {item.icon}
                <span
                  className={`ml-3 font-medium transition-opacity duration-300
                  ${isMenuOpen ? "opacity-100" : "opacity-0 hidden lg:block"}`}
                >
                  {item.text}
                </span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-indigo-500/50">
            <div
              className={`flex items-center space-x-3 ${
                isMenuOpen ? "" : "justify-center"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              {isMenuOpen && (
                <div>
                  <p className="text-white font-medium truncate">
                    Jānis Bērziņš
                  </p>
                  <p className="text-indigo-200 text-sm truncate">
                    Administrators
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-indigo-500 text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {isMobile && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu size={24} className="text-gray-600" />
                </button>
              )}

              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Meklēt rakstus..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                  <Bell size={22} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="hidden md:flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors gap-2">
                  <Plus size={18} />
                  <span>Jauns Raksts</span>
                </button>
              </div>
            </div>
          </div>

          {activePage === "blogs" && (
            <div className="px-4 py-2 border-t border-gray-200 overflow-x-auto">
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap
                    ${
                      !selectedCategory
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  Visi raksti
                </button>
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap
                      ${
                        selectedCategory === category.id
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activePage === "sakums" && <HomePage />}
            {activePage === "blogs" && (
              <>
                {/* Blog Content Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Jaunākie Raksti
                    </h1>
                    <p className="text-gray-500 mt-1">
                      {MOCK_POSTS.length} raksti pieejami
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded ${
                          viewMode === "grid"
                            ? "bg-indigo-100 text-indigo-600"
                            : "text-gray-600"
                        }`}
                      >
                        <LayoutGrid size={20} />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded ${
                          viewMode === "list"
                            ? "bg-indigo-100 text-indigo-600"
                            : "text-gray-600"
                        }`}
                      >
                        <List size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Blog Posts Grid */}
                <div
                  className={`
                  ${
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-6"
                  }
                `}
                >
                  {MOCK_POSTS.filter(
                    (post) =>
                      (!searchQuery ||
                        post.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        post.excerpt
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())) &&
                      (!selectedCategory ||
                        post.category.toLowerCase() === selectedCategory)
                  ).map((post) => (
                    <BlogPost key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}
            {activePage === "par" && <AboutPage />}
            {activePage === "kontakti" && <ContactPage />}
            {activePage === "admin" && <AdminPanel />}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-8">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-500 text-sm">
                © 2024 Web Works Blog. Visas tiesības aizsargātas.
              </div>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Privātuma politika
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Lietošanas noteikumi
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Kontakti
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Demo Card - Now contained within parent */}
        {showDemoCard && (
          <div className="absolute bottom-4 right-4 max-w-sm mx-4">
            <div className="bg-white rounded-xl shadow-lg p-4 border border-indigo-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="text-indigo-600" size={20} />
                  <h4 className="font-medium text-gray-900">Demo Versija</h4>
                </div>
                <button
                  onClick={() => setShowDemoCard(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-indigo-600 mb-1">
                      <LayoutGrid size={16} />
                      <span className="font-medium text-sm">
                        Adaptīvs Dizains
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Responsīvs visām ierīcēm
                    </p>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-indigo-600 mb-1">
                      <Search size={16} />
                      <span className="font-medium text-sm">Meklēšana</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Ātra satura atrašana
                    </p>
                  </div>
                </div>
                <button
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                  onClick={() =>
                    alert(
                      "Paldies par interesi! Sazinieties ar mums, lai uzzinātu vairāk."
                    )
                  }
                >
                  Uzzināt Vairāk
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Quick Action Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <button
          className="w-12 h-12 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white"
          onClick={() => alert("Jauna raksta izveide (Demo)")}
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default BlogSystem;
