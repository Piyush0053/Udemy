import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface AnalysisResult {
  keywordMatches: { [key: string]: number };
  score: number;
  suggestions: string[];
}

export const uploadResume = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await axios.post(`${API_URL}/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.analysis;
};