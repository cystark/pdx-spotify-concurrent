import React, { useState, useRef } from "react";
import shortid from "shortid";
import styled from "styled-components";

import Container from "../Components/Container";
import Table from "../Components/Table";
import Loading from "../Components/Loading";
import ErrorBoundary from "../Utils/ErrorBoundary";
import useSpotifySearch from "../Utils/useSpotifySearch";
import Banner from "../Banners/Banner";

const delay = (time) => (promiseResult) =>
  new Promise<any>((resolve) => setTimeout(() => resolve(promiseResult), time));

const StyledWrap = styled(Container)`
  padding: 20px 0;
  background-color: ${({ theme }) => theme};
  transition: background-color 0.3s ease-in-out;
`;

const StyledInputContainer = styled.div`
  label {
    display: block;
    width 100%;
    margin-bottom: 20px;
  }
  span {
    margin-right: 10px;
  }
`;

const ResultsPrompt = styled.div`
  font-size: 14px;
  position: absolute;
  right: 0;
  top: 0;
`;

const Banners = styled.div`
  display: flex;
  height: 120px;
  width: 100%;
`;

const TopTracksBanner = React.lazy(() =>
  import("../Banners/TopTracks").then(delay(400))
);
const MusicNewsBanner = React.lazy(() =>
  import("../Banners/MusicNews").then(delay(1090))
);
const PlaylistsBanner = React.lazy(() =>
  import("../Banners/Playlists").then(delay(1200))
);

/**
 * Search -> Loading -> Display Resul
 **/

const MusicTable = ({ resource }) => {
  const data = resource.read();
  return (
    <Table>
      <thead>
        <tr>
          <th>Artist</th>
          <th>Song</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ artist, song, url }) => (
          <tr key={shortid.generate()}>
            <td>{artist}</td>
            <td>{song}</td>
            <td>
              <a href={url}>{url}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const BannerLoading = () => (
  <Banner>
    <span role="img" aria-label="loading">
      🎷
    </span>
  </Banner>
);

const MusicPage = () => {
  const [search, setSearch] = useState("");
  const [resource, isPending] = useSpotifySearch(search);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      const ref = inputRef.current;
      if (ref) {
        setSearch(ref.value);
      }
    }
  };

  return (
    <>
      <Banners>
        <React.Suspense fallback={<BannerLoading />}>
          <TopTracksBanner />
        </React.Suspense>
        <React.Suspense fallback={<BannerLoading />}>
          <PlaylistsBanner />
        </React.Suspense>
        <React.Suspense fallback={<BannerLoading />}>
          <MusicNewsBanner />
        </React.Suspense>
      </Banners>

      <StyledWrap theme={isPending ? "#f9f9f9" : "white"}>
        <Container>
          <section>
            <h2>Music</h2>
            {search && (
              <ResultsPrompt>
                {resource && isPending ? (
                  <Loading width="100" />
                ) : (
                  <p>
                    Results for: <b>{search}</b>
                  </p>
                )}
              </ResultsPrompt>
            )}
            <StyledInputContainer>
              <label>
                <span>Search Spotify</span>
                <input ref={inputRef} onKeyDown={onKeyDown} type="search" />
              </label>
            </StyledInputContainer>
            {resource && (
              <ErrorBoundary>
                <React.Suspense
                  fallback={
                    <div>
                      <Loading />
                      <div>...Loading</div>
                    </div>
                  }
                >
                  <MusicTable resource={resource} />
                </React.Suspense>
              </ErrorBoundary>
            )}
          </section>
        </Container>
      </StyledWrap>
    </>
  );
};

export default MusicPage;
