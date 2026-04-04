import Footer from "../Footer";
import Header from "../Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </>
);

export default AuthLayout;
