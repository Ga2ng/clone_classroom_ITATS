import React from "react";

const Footer = () => {
  return (
    <div>

      <footer className="footer p-10 bg-[#1E1926] text-neutral-content">
        <nav>
          <header className="footer-title ">F.Teknologi Industri </header>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926] ">Teknik Mesin</a>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Teknik Industri</a>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Teknik Kimia</a>
        </nav>
        <nav>
          <header className="footer-title">F.Teknik Sipil & Perencanaan</header>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Teknik Sipil</a>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Arsitektur</a>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Teknik Lingkungan</a>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Desain Produk</a>
        </nav>
        <nav>
          <header className="footer-title">F.Teknik Elektro & Teknologi Informasi</header>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Teknik Elektro</a>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Teknik Informatika</a>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Sistem Informasi</a>
        </nav>
        <nav>
          <header className="footer-title">F.Teknologi Mineral dan Kelautan</header>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Teknik Pertambangan</a>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Teknik Perkapalan</a>
        </nav>
        <nav>
          <header className="footer-title">Program Pascasarjana</header>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Magister Teknik Industri</a>
          <a className="link link-hover hover:text-[#764AF1] hover:underline hover:decoration-[#1E1926]">Magister Teknik Lingkungan</a>
        </nav>
      </footer>
        <div className="bg-black text-white p-4">
          © 2023 ITATS clone classroom | Developed By Ga2ng
        </div>
    </div>
  );
};

export default Footer;
