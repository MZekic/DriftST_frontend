import axios from "axios";
import $router from "@/router";
// instanca axios-a za potrebe driftst backenda
let Service = axios.create({
  // baseURL: "https://driftst.herokuapp.com/",
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});

Service.interceptors.request.use((request) => {
  try {
    request.headers["Authorization"] = "Bearer " + Auth.getToken();
  } catch (e) {
    console.error(e);
  }
  return request;
});

Service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      Auth.logout();
      $router.go();
    }
  }
);

let Auth = {
  async login(username, password) {
    let response = await Service.post("/auth", {
      username: username,
      password: password,
    });
    console.log(response);
    let user = response.data;
    localStorage.setItem("user", JSON.stringify(user));

    return true;
  },
  async signup(username, password, name, category) {
    let response = await Service.post("/user", {
      username: username,
      password: password,
      name: name,
      selected: category,
    });
    console.log(response);

    return true;
  },
  async changeYourPassword(username, old_password, new_password) {
    let response = await Service.post("/user/changepassword", {
      username: username,
      old_password: old_password,
      new_password: new_password,
    });
    console.log(response);

    return true;
  },
  logout() {
    localStorage.removeItem("user");
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  getToken() {
    let user = Auth.getUser();
    if (user && user.token) {
      return user.token;
    } else {
      return false;
    }
  },

  authenticated() {
    let user = Auth.getUser();
    if (user && user.token) {
      return true;
    }
    return false;
  },
  state: {
    get authenticated() {
      return Auth.authenticated();
    },
    get getUser() {
      return Auth.getUser();
    },
  },
};

let allCompetitors = {
  async getCompetitors() {
    let response = await Service.get("/users");

    let competitors = response.data.map((doc) => {
      return {
        username: doc.username,
        name: doc.name,
        selected: doc.category,
        wins: doc.wins
      };
    });

    return competitors;
  },
};

let renderTournaments = [];

let Tournaments = {
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  getUsername() {
    let user = Tournaments.getUser();
    if (user && user.username) {
      return user.username;
    } else {
      return false;
    }
  },

  async getMyProfile() {
    let response = await Service.get(`myProfile/${this.getUsername()}`);

    return response.data;
  },
  async getTournaments() {
    let response = await Service.get("/tournaments");

    renderTournaments = response.data.map((doc) => {
      return {
        tournamentName: doc.tournamentName,
        _id: doc._id,
        competitors: doc.competitors,
      };
    });

    return renderTournaments;
  },

  async createTournament(tournamentName, _id) {
    await Service.post("/tournaments/create", {
      tournamentName: tournamentName,
      _id: _id,
    }).then(alert(`Turnir ${_id} je kreiran`));
  },

  async joinTournament(_id) {
    let username = Tournaments.getUsername();
    let index = renderTournaments.findIndex((item) => item._id === _id);

    if (
      !renderTournaments[index].competitors.includes(username) &&
      renderTournaments[index].competitors.length < 17
    ) {
      renderTournaments[index].competitors.push(username);

      await Service.post("/tournaments/join", {
        competitors: username,
        _id: _id,
      });
    } else {
      alert("Vec ste prijavljeni na ovaj turnir");
    }
  },

  async getStatistics() {
    let response = await Service.get("/tournaments/statistics");
    console.log(response);

    return response.data;
  },

  async viewBracket() {
    let response = await Service.get(window.location.pathname);

    return response.data;
  },
  async bracketFunction(index, round, _id) {
    await Service.post("/brackets/win", {
      round: round,
      id: _id,
      index: index,
    });
  },

  async endTournament(username, _id){
    console.log(username)
    let response = await Service.post(`/brackets/winner`, {
      username: username,
      id: _id
    })
    console.log(response)
  },

  async deleteTournament(_id) {
    console.log("123", _id);
    // window.location.reload();
    let response = await Service.post(`/tournaments/delete`, {
      _id: _id,
    }).then(alert(`Turnir ${_id} je izbrisan`));
    // let response = await Service.delete(window.location.pathname);
    console.log(response);
  },
};

export { Service, Auth, allCompetitors, Tournaments };
