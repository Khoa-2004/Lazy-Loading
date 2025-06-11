import React, { useState, useEffect } from "react";
import "./Demo.css";
import Data from "../Data.json";
import LazyLoad from "react-lazyload";

//Component placeholder du lieu dang duoc load
const Loading = () => (
  <div className="post-loading">
    <h5>Loading...</h5>
  </div>
);

// Component delay load post
const DelayedPost = (props) => {
  // Tao mot state show de kiem soat viec hien thi post, mac dinh la false
  const [show, setShow] = useState(false);

  // Sau 1 giay, setShow se duoc set ve true de hien thi post
  useEffect(() => {
    const delay = setTimeout(() => setShow(true), 1000);
    // Neu component bi huy, se xoa bo delay
    return () => clearTimeout(delay);
  }, []);

  return show ? <Post {...props} /> : <Loading />;
};

// Component hien thi tung post
const Post = ({ title, body, image, video }) => (
  <div className="post">
    {/*Lay du lieu tu json (title, body)*/}
    <div className="post-body">
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
    {/*Lay du lieu tu json (img,vid)*/}
    <div className="post-media">
      {image && <img src={image} alt="Placeholder" />}
      {video && (
        <video controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  </div>
);

// Component chinh cua ung dung
// Su dung LazyLoad de load tung post khi no xuat hien tren
const App = () => (
  <div className="App">
    <div className="post-container">
      {/* Map qua tung post trong Data.json*/}
      {Data.map((post) => (
        // Su dung LazyLoad de chi load khi post xuat hien
        <LazyLoad
          //Style cho moi post
          key={post.id}
          height={200}
          offset={[-100, 100]}
          // Placeholder = component Loading
          placeholder={<Loading />}
          // Chi load mot lan
          once={true}
        >
          {/* Truyen toan bo thuoc tinh cua post vao component DelayedPost */}
          <DelayedPost {...post} />
        </LazyLoad>
      ))}
    </div>
  </div>
);

export default App;
