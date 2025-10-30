import { useState } from "react";
import { toast } from 'react-toastify';
import { createHabit, updateHabit } from "../../services/habitServices";
import { useHabit } from "../../hooks/useHabit";

type HabitFormModalProps = {
  type: 'create' | 'edit';
  onClose: ()=>void
  onSuccess?: () => void; // callback after creating/updating
  id?:string,
  name?:string,
  des?:string
};

export default function HabitFormModal({ onClose, onSuccess,type ,id,name, des}: HabitFormModalProps) {
  const [habitName, setHabitName] = useState<string>(name || '');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [description, setDescription] = useState(des|| "")
  const {setIsHabits} = useHabit();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(type === 'create'){
      const res = await createHabit({ habitName:habitName, frequency:frequency,description });
  // console.debug('create', res);
      setIsHabits((prev)=>[res.habit,...prev])
      onSuccess?.(); // optional callback to update habit list
      onClose();     // close the modal after success
      }
      else{
        if(!id){
          throw new Error("No habit ID provided.")
        }
        const res = await updateHabit(id,{habitName,frequency,description});
        setIsHabits((prev)=>
          prev.map((h)=>(h._id === id ? res.habit : h))
        )
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      console.error("Failed to save new habit:", error);
      toast.error("Failed to create habit now.");
    }
  };

  return (
    <>
      <h2 className="text-base md:text-lg font-bold mb-4">{type === 'create' ? 'Create Habit' : 'Edit Habit'}</h2>
      <form onSubmit={handleSubmit} className=" space-y-2 md:space-y-4">
        <input
          type="text"
          placeholder="Habit Name"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          required
          className="w-full border p-2 rounded-lg text-sm md:text-base"
        />
        <input type="text"
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        className="w-full border p-2 rounded-lg text-sm md:text-base"
         />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
          className="w-full border p-2 rounded-lg text-sm md:text-base"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <button
          type="submit"
          className="w-full bg-brand-500 text-sm md:text-base text-white py-2 rounded-lg hover:bg-brand-600"
        >
          {type === 'create' ? 'Save' : 'Update'}
        </button>
      </form>
      </>
  );
}
