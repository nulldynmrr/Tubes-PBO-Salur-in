"use client";
import { useState, useEffect } from 'react';
import { campaignService } from '@/services/api/campaign.service';
import { toast } from 'react-toastify';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const data = await campaignService.getCampaigns();
      setCampaigns(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch campaigns');
      toast.error('Failed to fetch campaigns');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
          <p className="text-gray-600 mb-4">{campaign.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-medium">
              Target: Rp {campaign.target.toLocaleString()}
            </span>
            <span className="text-green-600 font-medium">
              Terkumpul: Rp {campaign.collected.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignList; 