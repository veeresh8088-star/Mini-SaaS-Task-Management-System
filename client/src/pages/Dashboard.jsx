import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { LayoutGrid, ListChecks, Search, Filter, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState('All'); // All, Pending, Completed
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    setIsSubmitting(true);
    try {
      const { data } = await api.post('/tasks', taskData);
      setTasks([data, ...tasks]);
      toast.success('Task added');
      return true;
    } catch (error) {
      toast.error('Failed to add task');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, { status });
      setTasks(tasks.map(t => t.id === id ? data : t));
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header & Stats */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Tasks</h1>
            <p className="text-slate-500">Welcome back, {user?.username}!</p>
          </div>
          
          <div className="flex gap-3">
            <StatCard label="Pending" value={stats.pending} color="text-amber-600" bg="bg-amber-50" />
            <StatCard label="Completed" value={stats.completed} color="text-green-600" bg="bg-green-50" />
            <StatCard label="Total" value={stats.total} color="text-primary-600" bg="bg-primary-50" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Pending', 'Completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                filter === f 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-6">
        <TaskForm onSubmit={handleCreateTask} isLoading={isSubmitting} />

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
            <p className="font-medium">Loading your tasks...</p>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {filteredTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggleStatus={handleToggleStatus}
                  onDelete={handleDeleteTask}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center glass-card border-dashed border-2 bg-transparent"
          >
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ListChecks className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No tasks found</h3>
            <p className="text-slate-500 max-w-xs mx-auto">
              {filter === 'All' 
                ? "You haven't added any tasks yet. Start by creating one above!" 
                : `You don't have any ${filter.toLowerCase()} tasks right now.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, bg }) => (
  <div className={`${bg} px-4 py-2 rounded-xl border border-white shadow-sm flex flex-col items-center min-w-[80px]`}>
    <span className={`text-lg font-bold ${color}`}>{value}</span>
    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
  </div>
);

export default Dashboard;
