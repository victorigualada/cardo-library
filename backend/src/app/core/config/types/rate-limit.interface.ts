export interface IRateLimit {
  windowMs: number; // minutes
  max: number; // limit each IP to max requests per windowMs
}
