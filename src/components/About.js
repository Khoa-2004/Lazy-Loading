import React from 'react';
import './About.css';
import Data from './Data.json'
import LazyLoad from 'react-lazyload'

/*Component hien thi thong bao dang load khi hinh anh + du lieu dang dc load. Kieu nhu placeholder*/

const Loading = () => (
    <div className="post-loading">
      <h5>Loading...</h5>
    </div>
  )
  
  /*Post nhan tu json (id title body)*/

    const Post = ({ id, title, body }) => (
      /*Hien thi hinh anh post (dong 19)*/
      <div className="post">
        <div className="post-img">
          <img
            src="https://i.kym-cdn.com/editorials/icons/original/000/012/509/YOGURT-GURT-YO.jpg"
            alt="...."
          />
        </div>
        <div className="post-body">
          <h4>{title}</h4>
          <p>{body}</p>
        </div>
      </div>
    );
  
    const App = () => (
      <div className="App">
        <div className="post-container">
          {Data.map(post => (
            /*Lay du lieu tu json va xu ly tung post
              Lazy load (chi load khi xuat hien)*/
            <LazyLoad
              /*Yeu cau key de xem du lieu trong json*/
              key={post.id}
              height={200}
              offset={[-100, 100]}
              placeholder={<Loading />}
              /*Chi lazy load mot lan duy nhat (ke khi quay lai*/
              once={true}
            >
              <Post {...post} />
            </LazyLoad>
            /*46: truyen data post(id title body) vao component post (dong 16)*/
          ))}
        </div>
      </div>
    );
  
  export default App