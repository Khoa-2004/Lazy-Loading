import React, { Suspense, useState, useEffect, useRef } from "react";
import LazyLoad from "react-lazyload";
import "./Home.css";
import Data from "../Data.json";

// ErrorBoundary component
class ErrorBoundary extends React.Component {
  // Khoi tao ham constructor nhan vao props, goi super(props) de ke thua constructor cha
  constructor(props) {
    super(props);
    // Khoi tao state, mac dinh false
    this.state = { hasError: false };
  }
  // Phuong thuc dc goi khi co loi o component con
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // In ra loi (optional)
    // console.error("ErrorBoundary caught an error", error, info);
  }
  // Neu state co loi thi hien thi tb loi
  // Ko co thi render bth
  render() {
    if (this.state.hasError) {
      return <div className="post-loading">Đã có lỗi khi tải nội dung.</div>;
    }
    // Neu ko goi super(props) thi ko xai dc this.props
    return this.props.children;
  }
}

// Dung trc khung skeleton trong tg cho du lieu tai len, tang trai nghiem ng dung
const Skeleton = () => (
  <div className="skeleton-item">
    <div className="skeleton-img" />
    <div className="skeleton-text">
      <div className="skeleton-title" />
      <div className="skeleton-body" />
    </div>
  </div>
);

// Component placeholder du lieu dang duoc load
const Loading = () => (
  <div className="post-loading">
    <h5>Loading...</h5>
  </div>
);

// Component hien thi tung post, do tg render tung post
// React.memo dung de render lai khi cac attr thay doi
const Post = React.memo(({ title, body, image, video }) => {
  // Tao ref de log tg render (do hieu nang)
  const startRef = useRef(performance.now());
  useEffect(() => {
    const end = performance.now();
    console.log(
      `Post "${title}" rendered in ${(end - startRef.current).toFixed(2)} ms`
    );
  }, [title]);
  return (
    //Layout
    <div
      className="news-item"
      style={{ flexDirection: "column", alignItems: "flex-start" }}
    >
      <div className="news-text" style={{ marginBottom: 16, width: "100%" }}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      {/*Su dung LL de anh va video khi gan xuat hien (offset 100px)*/}
      <LazyLoad
        height={320}
        offset={100}
        //LL 1 lan
        once
        //Chua tai xong thi la khung Skeleton
        placeholder={<Skeleton />}
      >
        {/*Style anh va vid*/}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {image && (
            <img
              src={image}
              alt="title-img"
              style={{
                width: 400,
                height: 320,
                borderRadius: 16,
                objectFit: "cover",
                boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
              }}
            />
          )}
          {video && (
            <video
              controls
              style={{
                width: 400,
                height: 320,
                borderRadius: 16,
                objectFit: "cover",
                background: "#000",
                boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
              }}
            >
              {/*Chi thich hop voi mp4, ko phai thi dong duoi*/}
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </LazyLoad>
    </div>
  );
});

// Home Component, đo thời gian render Home
const Home = () => {
  // Set so luong post ban dau la 2
  const [visibleCount, setVisibleCount] = useState(2);
  // Dung useRef de tao 1 tham chieu DOM coi post co hien len man hinh (dung cho IntersectionObserver)
  const loaderRef = useRef(null);
  // Tao IntersectionObserver de coi loaderRef co trong kg man hinh ch
  // Khi scroll den cuoi man hinh sau 500ms se hien thi so lg Post len 1

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisibleCount((prev) => (prev < Data.length ? prev + 1 : prev));
          }, 500);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    // Neu bi huy/reload thi tat
    return () => observer.disconnect();
  }, []);

  return (
    <div className="news-layout">
      <div className="main-content">
        <h2>Tin tức 24h</h2>

        {/* Duyet Data va tung mang tu 0 den het, hien thi tung post */}
        {Data.slice(0, visibleCount).map((item) => (
          <div key={item.id}>
            {/* Boc Post = ErrorBoundary de bat loi neu LL sai */}
            <ErrorBoundary>
              <Suspense>
                <Post {...item} />
              </Suspense>
            </ErrorBoundary>
            <div className="divider-line" />
          </div>
        ))}

        {/* Neu scroll chua het thi show Loading */}
        {visibleCount < Data.length && (
          <div ref={loaderRef}>
            <Loading />
          </div>
        )}
      </div>

      <div className="sidebar">
        <h3>Xem nhiều</h3>
        <ul className="sidebar-list">
          <li>Việt Nam thua Malaysia 0-4...</li>
          <li>'Nhà tôi 3 người bán tạp hóa...'</li>
          <li>Khởi tố vụ án bé 10 tháng...</li>
          <li>Indonesia thảm bại 0-6...</li>
          <li>Mưa lớn ở TP HCM...</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
