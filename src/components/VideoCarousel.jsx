import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: true,
    videoId: 0,
    isLastVideo: false,
    isPlaying: true,
  });

  const { isLastVideo, videoId, isPlaying } = video;

  useGSAP(() => {
    // Slider movement animation
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 1.5,
      ease: "power3.inOut",
    });
  }, [videoId]);

  useEffect(() => {
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // Progress bar fill animation
      let anim = gsap.to(span[videoId], {
        width: "100%",
        backgroundColor: "white",
        duration: 5,
        ease: "none",
        onStart: () => {
          // Animate the container dot to active layout
          gsap.to(videoDivRef.current[videoId], {
            width: window.innerWidth < 760 ? "10vw" : "4vw",
            duration: 0.3,
          });
        },
        onComplete: () => {
          // Collapse active container dot
          gsap.to(videoDivRef.current[videoId], {
            width: "12px",
            duration: 0.3,
          });
          gsap.to(span[videoId], {
            backgroundColor: "#afafaf",
          });

          if (isPlaying) {
            setVideo((pre) => ({
              ...pre,
              videoId: (pre.videoId + 1) % hightlightsSlides.length
            }));
          }
        },
      });

      if (!isPlaying) {
        anim.pause();
      }

      // Reset and collapse all inactive dots and progress spans
      hightlightsSlides.forEach((_, idx) => {
        if (idx !== videoId) {
          gsap.set(span[idx], { width: "0%", backgroundColor: "#afafaf" });
          gsap.set(videoDivRef.current[idx], { width: "12px" });
        }
      });

      return () => {
        anim.kill();
      };
    }
  }, [videoId, isPlaying]);

  const handleProcess = (type) => {
    switch (type) {
      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false, isPlaying: true }));
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: false }));
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: true, isLastVideo: false }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-neutral-950 relative border border-white/10 shadow-2xl">
                {/* Blurred ambient background to fill landscape container */}
                <img
                  src={list.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-40 scale-105 pointer-events-none"
                />

                {/* Main clean uncropped image */}
                <img
                  src={list.img}
                  alt={`Highlight ${i + 1}`}
                  className="relative z-10 max-h-full max-w-full object-contain pointer-events-none"
                />

                {/* Ambient dark bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent z-10 pointer-events-none" />
              </div>

              <div className="absolute bottom-4 sm:bottom-auto sm:top-12 left-[5%] right-[5%] z-30">
                {list.textLists.map((text, idx) => (
                  <p key={idx} className="md:text-2xl sm:text-lg text-sm font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full border border-white/10 shadow-inner">
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200/30 rounded-full relative cursor-pointer overflow-hidden transition-all duration-300"
              ref={(el) => (videoDivRef.current[i] = el)}
              onClick={() => setVideo((pre) => ({ ...pre, videoId: i, isLastVideo: false, isPlaying: true }))}
            >
              <span
                className="absolute h-full left-0 top-0 rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
                style={{ width: "0%" }}
              />
            </span>
          ))}
        </div>

        <button className="control-btn hover:scale-105 transition-transform duration-200">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
