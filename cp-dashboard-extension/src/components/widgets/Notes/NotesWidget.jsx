import { useState } from 'react';

const NotesWidget = () => {
  const [note, setNote] = useState(localStorage.getItem('cp-note') || '');

  const handleChange = (e) => {
    setNote(e.target.value);
    localStorage.setItem('cp-note', e.target.value);
  };

  return (
    <div className="p-4 bg-yellow-100/10 backdrop-blur-md border border-yellow-200/20 rounded-3xl shadow-xl w-full h-full flex flex-col">
      <h3 className="text-sm font-semibold text-yellow-400 mb-2 uppercase tracking-wider">Quick Notes</h3>
      <textarea
        className="bg-transparent text-white w-full h-full outline-none resize-none placeholder-gray-500"
        placeholder="Ek problem aur..."
        value={note}
        onChange={handleChange}
      />
    </div>
  );
};

export default NotesWidget;