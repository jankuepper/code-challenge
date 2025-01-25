import {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";

export type AuthData = {
  token: string;
  user: { id: number; username: string; email: string; type: string };
};

const AuthContext = createContext<{
  authData?: AuthData;
  setAuthData?: any;
}>({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) {
  const [authData, setAuthData] = useState<AuthData | undefined>(undefined);
  const contextValue = useMemo(
    () => ({
      authData,
      setAuthData: (data: AuthData) => setAuthData(data),
    }),
    [authData]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
