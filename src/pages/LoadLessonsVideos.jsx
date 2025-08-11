import { useState } from 'react';

const videos = {
    MathF: [
        { title: "Math D Video 1", url: "https://www.youtube.com/embed/kTCO4qfTLpw" },
        { title: "Math D Video 2", url: "https://www.youtube.com/embed/XmrSB7XIxbw" },
        { title: "Math D Video 3", url: "https://www.youtube.com/embed/919O1a7ayRo" }
    ],
    glwssaD: [
        { title: "Glwssa D Video 1", url: "https://www.youtube.com/embed/jkl012" },
        { title: "Glwssa D Video 2", url: "https://www.youtube.com/embed/mno345" },
        { title: "Glwssa D Video 3", url: "https://www.youtube.com/embed/pqr678" }
    ],
    historyD: [
        { title: "History D Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "History D Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "History D Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    meletiD: [
        { title: "Meleti D Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "Meleti D Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "Meleti D Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    englishD: [
        { title: "English D Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "English D Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "English D Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    tpeD: [
        { title: "Tpe D Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "Tpe D Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "Tpe D Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    glwssaF: [
        { title: "Glwssa F Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "Glwssa F Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "Glwssa F Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    MathD: [
        { title: "Math F Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "Math F Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "Math F Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    geographyF: [
        { title: "Geography F Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "Geography F Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "Geography F Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    physicsF: [
        { title: "Physics F Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "Physics F Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "Physics F Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    kpaF: [
        { title: "Kpa F Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "Kpa F Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "Kpa F Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    englishF: [
        { title: "English F Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "English F Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "English F Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    germanF: [
        { title: "German F Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "German F Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "German F Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    frenchF: [
        { title: "French F Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "French F Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "French F Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ],
    tpeF: [
        { title: "Tpe F Video 1", url: "https://www.youtube.com/embed/stu901" },
        { title: "Tpe F Video 2", url: "https://www.youtube.com/embed/vwx234" },
        { title: "Tpe F Video 3", url: "https://www.youtube.com/embed/yz5678" }
    ]
};

const LoadLessonsVideos = ({ selectedLesson }) => {
  console.log("Load Lesson Rendered for lesson:", selectedLesson);

  const renderVideos = () => {
    if (!selectedLesson) return null;

    const lessonVideos = videos[selectedLesson];
    if (!lessonVideos || lessonVideos.length === 0) {
      return <p>No videos found for this lesson.</p>;
    }

    return lessonVideos.map((video, index) => (
      <div key={index} style={{ marginBottom: '30px' }}>
        <iframe
          width="560"
          height="315"
          src={video.url}
          frameBorder="0"
          allowFullScreen
          title={video.title}
        />
      </div>
    ));
  };

  return (
      <div id="video-player">
        {renderVideos()}
      </div>
  );
};


export default LoadLessonsVideos;
