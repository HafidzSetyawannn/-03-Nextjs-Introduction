import Link from "next/link";
import { GetStaticProps, NextPage } from "next";

interface User {
  id: number;
  name: string;
  email: string;
}

interface HomePageProps {
  users: User[];
}

const HomePage: NextPage<HomePageProps> = ({ users }) => {
  return (
    <div>
      <h1>Selamat Datang di Website Saya!</h1>
      <p>Ini adalah halaman utama.</p>

      <nav>
        <ul>
          <li>
            <Link href="/about">Tentang Kami</Link>
          </li>
          <li>
            <Link href="/weather">Cek Cuaca</Link>
          </li>
        </ul>
      </nav>

      <h2>Daftar Pengguna</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return {
    props: { users },
  };
};

export default HomePage;
