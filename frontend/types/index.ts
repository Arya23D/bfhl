export interface ApiResponse {
    is_success: boolean;
    user_id: string;
    email: string;
    roll_number: string;
    numbers: string[];
    alphabets: string[];
    highest_alphabet: string[];
  }
  
  export interface FilterOption {
    label: string;
    value: keyof Pick<ApiResponse, 'numbers' | 'alphabets' | 'highest_alphabet'>;
  }
  