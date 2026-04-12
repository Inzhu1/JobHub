export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Job {
  id?: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary_min: number;
  salary_max: number;
  job_type: 'full_time' | 'part_time' | 'internship';
  is_active: boolean;
  category: number;
  category_name?: string;
  employer?: number;
  employer_name?: string;
  created_at?: string;
}

export interface Application {
  id: number;
  job_id: number;
  job_title: string;
  cover_letter: string;
  status: 'pending' | 'accepted' | 'rejected';
  applied_at: string;
}
