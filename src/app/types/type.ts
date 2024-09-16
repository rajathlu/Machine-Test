export interface MyComponentProps {
    role: string;
    profilePic: string;
  }

  export interface UserState {
    user: {
      id: string;
      name: string;
      // other user properties
    } | null;
  }
  
  export interface RootState {
    user: UserState;
    // other slices of state
  }