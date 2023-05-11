import React, { useState, useEffect, useMemo } from "react";
import "../App.css";
import { useGet, useMutate } from "restful-react";
import { useMovie } from "../providers/movie";
import { IMovieDto } from "../providers/movie/context";

let isSave = false;

let oldId = "";
let oldTitle = "";
let oldDuration = "";
let oldStarring = "";
let oldCategory = "";

let viewTitle = "";
let viewDuration = "";
let viewStarring = "";
let viewCategory = "";
let moviePicture = "";

const movieGenres = [
  { value: "selectGenre", label: "--Select Genre--" },
  { value: "action", label: "Action" },
  { value: "adventure", label: "Adventure" },
  { value: "horror", label: "Horror" },
  { value: "drama", label: "Drama" },
  { value: "comedy", label: "Comedy" },
  { value: "science-fiction", label: "Science Fiction" },
  { value: "romance", label: "Romance" },
  { value: "thriller", label: "Thriller" },
];

interface IMovies {
  id: string;
  title: string;
  duration: string;
  starring: string;
  category: string;
}

const backgroundImage = "https://wallpapercave.com/wp/wp4957081.jpg";
// const backgroundImage = "https://wallpaperaccess.com/full/9140095.jpg";

export default function Movies(props: any) {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [starring, setStarring] = useState("");
  const [movieId, setMoviId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState(movieGenres[0].label);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupView, setShowPopupView] = useState(false);

  const {
    createMovie,
    fetchMovies,
    moviesFetched,
    movieCreated,
    updateMovie,
    movieUpdated,
    deleteMovie,
    movieDeleted,
  } = useMovie();

  const { mutate: saveMovie, loading: addMovieLoading } = useMutate({
    verb: "POST",
    path: "https://localhost:44311/api/services/app/Movie/Create",
  });

  useEffect(() => {
    if (addMovieLoading) {
    }
  }, [addMovieLoading]);

  const updateTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const updateDuration = (event: any) => {
    setDuration(event.target.value);
  };

  const updateStarring = (event: any) => {
    setStarring(event.target.value);
  };

  const updateCategory = (event: any) => {
    setCategory(event.target.value);
  };

  const updateSearchText = (event: any) => {
    setSearchText(event.target.value);
  };

  const updateMyMovie = () => {
    const data: IMovieDto = {
      title,
      duration,
      category,
      year: starring,
      description: starring,
      id: movieId,
    };

    updateMovie(data);
  };

  let moviesToDisplay = movies;

  const commonMovies = [
    {
      name: "Kate",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Iq94A6KHWmxdN5KBeWa2BrzjplJJx7mMtQ&usqp=CAU",
    },
    {
      name: "Man Of Wrath",
      url: "https://i.ytimg.com/vi/10aZTvGX8Fs/movieposter_en.jpg",
    },
    {
      name: "The Town",
      url: "https://images.moviesanywhere.com/465e8e9d4b0640b2c6e39b7613fd5f3f/79dffe23-c2e4-407d-8347-15a0e391ea85.jpg",
    },
    {
      name: "Church girl",
      url: "https://lh3.googleusercontent.com/pRh-rUz2-O4fsiOrNhtAkJr_5oStJp9MSH39uzleF3xkphQ2YI3utTt3Yesh38gwcNdizEi8V00",
    },
    {
      name: "Fast and Furious",
      url: "https://www.syfy.com/sites/syfy/files/2023/03/fast_x_poster.jpg",
    },
    {
      name: "John Wick",
      url: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg",
    },
  ];

  if (searchText) {
    moviesToDisplay = movies.filter((movie: any) =>
      movie.title
        .toLocaleLowerCase()
        .includes(searchText.trim().toLocaleLowerCase())
    );
  }

  const close = () => {
    setShowPopup(false);
  };

  const closeView = () => {
    setShowPopupView(false);
  };

  const addMovie = () => {
    isSave = true;
    setShowPopup(true);
    setCategory("");
    setDuration("");
    setStarring("");
    setTitle("");
  };


  const DisplayMovieToEdit = (movie: any) => {
    isSave = false;
    oldId = movie.id;
    oldTitle = movie.title;
    oldDuration = movie.duration;
    oldStarring = movie.starring;
    oldCategory = movie.category;

    setTitle(movie.title);
    setDuration(movie.duration);
    setStarring(movie.starring);
    setCategory(movie.category);
    setMoviId(movie.id);
    setShowPopup(true);
  };

  const DisplayMovie = (movie: any) => {
    viewTitle = movie.title;
    viewDuration = movie.duration;
    viewStarring = movie.starring;
    viewCategory = movie.category;
    moviePicture =
      "https://thedailyguardian.com/wp-content/uploads/2022/09/Netflix.jpg";
    commonMovies.forEach((m) => {
      if (
        movie.title
          .trim()
          .toLocaleLowerCase()
          .includes(m.name.toLocaleLowerCase())
      ) {
        moviePicture = m.url;
        return;
      }
    });
    setShowPopupView(true);
  };

  const logout = () => {
    props.authHandler(false);
    localStorage.removeItem("token");
  };

  //my save movie by yourself
  const savingMovie = () => {
    //create movie using provider
    const myMovie: IMovieDto = {
      title: title,
      duration: duration,
      category: category,
      year: "",
      description: "",
    };

    createMovie(myMovie);

    setTitle("");
    setDuration("");
    setStarring("");
    setCategory("");
  };

  const saveOrUpdateMovie = () => {
    if (isSave) {
      const myMovie: IMovieDto = {
        title: title,
        duration: duration,
        category: category,
        year: "",
        description: "",
      };

      createMovie(myMovie);

      setTitle("");
      setDuration("");
      setStarring("");
      setCategory("");
    } else {
      const data: IMovieDto = {
        title,
        duration,
        category,
        year: starring,
        description: starring,
        id: movieId,
      };

      updateMovie(data);
    }
  };

  //fetch movies
  useEffect(() => {
    fetchMovies();
  }, [movieCreated, movieUpdated, movieDeleted]);

  console.log(moviesFetched);

  // const save = () => {
  //   if (isSave) {
  //     if (title && duration && starring && category !== "--Select Genre--") {
  //       const id =
  //         Date.now().toString(36) + Math.random().toString(36).substr(2);
  //       const movie = {
  //         id: id,
  //         title: title,
  //         duration: duration,
  //         starring: starring,
  //         category: category,
  //       };

  //       // remote
  //       saveMovie({
  //         title: title,
  //         duration: duration,
  //         starring: starring,
  //         genre: category,
  //       })
  //         .then(() => {
  //           console.log("save worked");
  //         })
  //         .catch((e) => console.log("save got error: ", e.data.error.message));
  //       //

  //       setMovies([...movies, movie]);
  //       setTitle("");
  //       setDuration("");
  //       setStarring("");
  //       setCategory(movieGenres[0].label);
  //       setShowPopup(false);
  //     } else {
  //       console.log("Fill all the fields");
  //     }
  //   } else {
  //     // Then we are editing
  //     if (title && duration && starring && category) {
  //       if (
  //         title !== oldTitle ||
  //         duration !== oldDuration ||
  //         starring !== oldStarring ||
  //         category !== oldCategory
  //       ) {
  //         const id = oldId;
  //         const editedMovie = {
  //           id: id,
  //           title: title,
  //           duration: duration,
  //           starring: starring,
  //           category: category,
  //         };
  //         const newMovies = movies.map((movie: any) => {
  //           if (movie.id === oldId) {
  //             return editedMovie;
  //           } else {
  //             return movie;
  //           }
  //         });
  //         console.log(newMovies);
  //         setMovies(newMovies);
  //         setTitle("");
  //         setDuration("");
  //         setStarring("");
  //         setCategory("");
  //         setShowPopup(false);
  //       } else {
  //         console.log("Nothing changes");
  //         setShowPopup(false);
  //       }
  //     } else {
  //       console.log("Fields are not all filled");
  //     }
  //   }
  // };

  const movieText = movies.length > 1 ? "movies" : "movie";

  console.log("save or update", isSave);

  return moviesFetched ? (
    <div
      className="parent-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        {movies.length > 0 ? (
          <h2 className="moviesNumber">{`${movies.length} ${movieText} loaded in`}</h2>
        ) : (
          <h2 className="moviesNumber">No movies loaded</h2>
        )}
        <div className="logout" onClick={logout}>
          <img
            src="https://img.icons8.com/?size=512&id=43908&format=png"
            alt="logout"
            height="25"
            width="25"
          />
        </div>
        <div className="header">
          <div onClick={addMovie} className="positive-button">
            <p className="add-text">Add</p>
          </div>
          <div className="search-container">
            <input
              placeholder="Search"
              id="title-input"
              type="text"
              value={searchText}
              onChange={updateSearchText}
            />
          </div>
        </div>
        {moviesToDisplay.length === 0 && movies.length > 0 ? (
          <div className="empty-search-container">
            <img
              src="https://img.icons8.com/?size=512&id=45967&format=png"
              alt="search empty"
              height="60"
              width="60"
            />
            <p className="empty-search-text">Your search is not found</p>
          </div>
        ) : (
          <table>
            {/* columns of the table */}
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>Title</th>
                <th>Duration</th>
                <th>Starring</th>
                <th>Category</th>
              </tr>
            </thead>

            {/* tables body */}
            <tbody>
              {moviesFetched.map((item: any) => (
                <tr key={item.id}>
                  <td>
                    <div
                      onClick={() => deleteMovie(item.id)}
                      className="delete"
                    >
                      <img
                        src="https://img.icons8.com/?size=512&id=7DbfyX80LGwU&format=png"
                        alt="delete"
                        height="25"
                        width="25"
                      />
                    </div>
                  </td>
                  <td>
                    <div onClick={() => DisplayMovie(item)} className="view">
                      <img
                        src="https://img.icons8.com/?size=512&id=61040&format=png"
                        alt="view"
                        height="25"
                        width="25"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      onClick={() => DisplayMovieToEdit(item)}
                      className="edit"
                    >
                      <img
                        src="https://img.icons8.com/?size=512&id=71201&format=png"
                        alt="edit"
                        height="25"
                        width="25"
                      />
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td>{item.duration}</td>
                  <td>{item.starring}</td>
                  <td>{item.genre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="page_number"></div>

        {/* update or save pop-up */}
        {showPopup ? (
          <div className="pop-up">
            <div className="close" onClick={close}>
              <img
                src="https://img.icons8.com/?size=512&id=59754&format=png"
                alt="edit"
                height="30"
                width="30"
              />
            </div>
            <h2 className="pop-up-header">Movie Details</h2>
            <input
              placeholder="Title"
              id="title-input"
              type="text"
              value={title}
              onChange={updateTitle}
            />
            <input
              placeholder="Duration"
              id="duration-input"
              type="text"
              value={duration}
              onChange={updateDuration}
            />
            <input
              placeholder="Starring"
              id="starring-input"
              type="text"
              value={starring}
              onChange={updateStarring}
            />
            <select
              className="category-picker"
              value={category}
              onChange={updateCategory}
            >
              {movieGenres.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="save-button" onClick={saveOrUpdateMovie}>
              <p className="add-text">SAVE</p>
            </div>
          </div>
        ) : null}

        {/* show details pop-up */}
        {showPopupView ? (
          <div className="pop-up-view">
            <div className="close" onClick={closeView}>
              <img
                src="https://img.icons8.com/?size=512&id=59754&format=png"
                alt="edit"
                height="30"
                width="30"
              />
            </div>
            <h2 className="view-header-text">Movie Detailsssss</h2>
            <img src={moviePicture} alt="edit" height="65" width="65" />
            <div className="view-container">
              <h3 className="h3-movie-infor">Title: </h3>
              <p className="movie-infor">{viewTitle}</p>
            </div>
            <div className="view-container">
              <h3 className="h3-movie-infor">Duration: </h3>
              <p className="movie-infor">{viewDuration}</p>
            </div>
            <div className="view-container">
              <h3 className="h3-movie-infor">Starring: </h3>
              <p className="movie-infor">{viewStarring}</p>
            </div>
            <div className="view-container">
              <h3 className="h3-movie-infor">Category: </h3>
              <p className="movie-infor">{viewCategory}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <>loading...</>
  );
}
