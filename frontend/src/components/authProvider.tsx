import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext({
  token: undefined,
});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) {
  const [token, setToken] = useState(undefined);
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
