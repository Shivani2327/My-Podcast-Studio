import React, { useEffect, useState } from 'react'
import'./listpodcast.css';

const ListPodcast = () => {

  const [podcastList, setPodcastList] = useState([]);
  const [selPodcast, setSelPodcast] = useState(null);

  const getData = async () => {

    const response = await fetch('http://localhost:5000/podcast/getall')
    console.log(response.status);
    const data = await response.json();

    console.log(data);
    setPodcastList(data);
  }

  useEffect(() => {
    getData()
  }, [])

  const player = () => {
    if (!selPodcast) return;

    return (
      
      <div className='' >
        <div className='card' style={{ marginTop: 'auto' }}>
        <div className='card-body'>
          <div className="row">

            <div className="col-1">
              <img src={"http://localhost:5000/" + selPodcast.image} className="img-fluid" style={{ height: '5rem' }} />
            </div>

            <div className="col-11">
              <h4>{selPodcast.title}</h4>
              <audio className='w-100' src={"http://localhost:5000/" + selPodcast.file} controls></audio>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }

  const displayPodcast = () => {
    return podcastList.map((podcast) => (
      <div className="card shadow-0 border rounded-3 mt-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-2 col-lg-2 mb-4 mb-lg-0">
              <div className="bg-image hover-zoom ripple rounded ripple-surface">
                <img
                  src={"http://localhost:5000/" + podcast.image}
                  className="w-100"
                />
                <a href="#!">
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                    />
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-6 col-lg-8">
              <h5>{podcast.title}</h5>

              <div className="mt-1 mb-0 text-muted small">
                <span>{podcast.uploadedBy}</span>

              </div>
              <div className="mb-2 text-muted small">
                published on &nbsp;&nbsp;<span className='text-dark'>{new Date(podcast.createdAt).toLocaleDateString()}</span>

              </div>
              <p className="text-truncate mb-4 mb-md-0">
                description here...
              </p>
            </div>
            <div className="col-md-4 col-lg-2 border-sm-start-none border-start">

              <h6 className="text-success">Free Podcast</h6>
              <div className="d-flex flex-column mt-4">
                <button className="btn btn-primary btn-sm" type="button" onClick={e => setSelPodcast(podcast)}>
                  Listen Now &nbsp;&nbsp;
                  <i class="fas fa-play"></i>
                </button>
                <button
                  className="btn btn-outline-primary btn-sm mt-2"
                  type="button"
                >
                  Add to wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    ))
  }

  return (
    <section className='listpodcast-container'>
      <div className="container py-5">
        {displayPodcast()}
      </div>
      {player()}
    </section>

  )
}

export default ListPodcast;