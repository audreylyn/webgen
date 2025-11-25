import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PreviewTemplate } from './PreviewTemplate';
import supabase from '../services/supabaseService';
import { Loader2, AlertTriangle } from 'lucide-react';

export const SubdomainPreview: React.FC = () => {
  const { subdomain } = useParams<{ subdomain: string }>();
  const [websiteId, setWebsiteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsiteBySubdomain = async () => {
      if (!subdomain) {
        setError('Invalid subdomain');
        setLoading(false);
        return;
      }

      try {
        const { data, error: queryError } = await supabase
          .from('websites')
          .select('id')
          .eq('subdomain', subdomain)
          .eq('status', 'active')
          .maybeSingle();

        if (queryError) throw queryError;

        if (!data) {
          setError('Website not found or is inactive');
        } else {
          setWebsiteId(data.id);
        }
      } catch (e) {
        setError('Failed to load website');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsiteBySubdomain();
  }, [subdomain]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center gap-2 text-slate-500 bg-slate-50">
        <Loader2 className="animate-spin w-6 h-6 text-indigo-600" />
        <span className="font-medium">Loading website...</span>
      </div>
    );
  }

  if (error || !websiteId) {
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4 text-slate-500 bg-slate-50 p-4 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full flex flex-col items-center">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Website Not Found</h2>
          <p className="text-slate-500 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  // Redirect to PreviewTemplate with the found website ID
  window.location.href = `#/preview/${websiteId}`;
  return null;
};
