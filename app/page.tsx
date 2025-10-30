'use client';
import { useState } from 'react';
import { z } from 'zod';

const phoneSchema = z.string()
  .min(1, 'Please enter a phone number')
  .transform((val) => val.replace(/\D/g, ''))
  .refine((digits) => digits.length === 10 || (digits.length === 11 && digits[0] === '1'), {
    message: 'Must have 10 digits (or 11 with country code 1)',
  })
  .refine((digits) => {
    const areaCode = digits.length === 10 ? digits[0] : digits[1];
    return areaCode !== '0' && areaCode !== '1';
  }, 'Area code cannot start with 0 or 1');

export default function Home() {
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = phoneSchema.safeParse(phone);
    setResult({
      success: validation.success,
      message: validation.success ? 'Valid ✓' : validation.error.issues[0]?.message || 'Invalid'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Phone Number Validator
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setResult(null);
            }}
            placeholder="(123) 456-7890"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg">
            Validate
          </button>
        </form>

        {result && (
          <div className={`mt-4 p-3 rounded-lg ${result.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            <p className="text-sm">{result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
