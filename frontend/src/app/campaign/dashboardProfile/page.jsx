"use client";
import Image from 'next/image';
import { useState } from 'react';
import Navbar from "@/components/Navbar";

import Input from '@/components/ui/input';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('donate');

  const donations = [
    { no: 1, name: 'Bantu mama nikah lagi', amount: 'Rp. 1000', date: '08/12/2077' },
    { no: 2, name: 'Bantu beli ipad', amount: 'Rp. 1000', date: '08/12/2077' },
    { no: 3, name: 'Bantu Palestina', amount: 'Rp. 1.000.000', date: '08/12/2077' },
  ];

  const campaigns = [
    { no: 1, name: 'Bantu Palestina', amountRaised: 'Rp. 1.000.000', amountTarget: 'Rp. 5.000.000', endDate: '08/12/2077', status: 'On Going' },
    { no: 2, name: 'Bantu Palestina', amountRaised: 'Rp. 1.000.000', amountTarget: 'Rp. 5.000.000', endDate: '08/12/2077', status: 'Complete' },
    { no: 3, name: 'Bantu Palestina', amountRaised: 'Rp. 1.000.000', amountTarget: 'Rp. 5.000.000', endDate: '08/12/2077', status: 'Rejected' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-100 text-green-700';
      case 'On Going':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  return (
    <div>
       <Navbar />
    
    <div className="max-w-4xl mx-auto py-32 px-4">
      {/* Profile Photo */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <Image src="/img/profilepic.jpg" alt="Profile" width={96} height={96} />
        </div>
      
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Input placeholder="Nama" />
        <Input placeholder="Email" />
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${activeTab === 'donate' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
            onClick={() => setActiveTab('donate')}
          >
            History Donate
          </button>
          <button
            className={`px-4 py-2 ml-4 ${activeTab === 'campaign' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
            onClick={() => setActiveTab('campaign')}
          >
            History Campaign
          </button>
        </div>

        {/* Table */}
        {activeTab === 'donate' && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">No</th>
                  <th className="py-2 px-4 border">Nama Campaign</th>
                  <th className="py-2 px-4 border">Jumlah Donasi</th>
                  <th className="py-2 px-4 border">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((item) => (
                  <tr key={item.no} className="text-center">
                    <td className="py-2 px-4 border">{item.no}</td>
                    <td className="py-2 px-4 border">{item.name}</td>
                    <td className="py-2 px-4 border">{item.amount}</td>
                    <td className="py-2 px-4 border">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Placeholder for Campaign Tab */}
        {activeTab === 'campaign' && (
          /*<div className="mt-4 text-center text-gray-500">Belum ada campaign.</div> */

          // dibawah ini jika campaign ada isinya
          <div className="overflow-x-auto mt-4">
              <table className="min-w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border">No</th>
                    <th className="py-2 px-4 border">Nama Campaign</th>
                    <th className="py-2 px-4 border">Jumlah Donasi</th>
                    <th className="py-2 px-4 border">Tanggal Berakhir</th>
                    <th className="py-2 px-4 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((item) => (
                    <tr key={item.no} className="text-center">
                      <td className="py-2 px-4 border">{item.no}</td>
                      <td className="py-2 px-4 border">{item.name}</td>
                      <td className="py-2 px-4 border">{item.amountRaised} / {item.amountTarget}</td>
                      <td className="py-2 px-4 border">{item.endDate}</td>
                      <td className="py-2 px-4 border">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )}

        
      </div>
    </div>
    </div>
  );
}
