export interface Repository {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  owner: {
    login: string;
  };
  html_url: string;
}

export interface GithubRepositoryAPIResponse {
  total_count: number;
  items: Repository[];
}
