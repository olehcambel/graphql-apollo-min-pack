import React from 'react';

const Home = () => (
  <div>
    <h1>Use sidebar to look through this App</h1>
    <form>
      <label htmlFor="name">name</label>
      <br />
      <input id="name" type="text" placeholder="name" label="name" />
      <br />
      <button action="submit">Create</button>
      <br />
    </form>
    <ul>
      <li placeholder="name">
        <label htmlFor="name">item.name</label>
        <input label="name" type="text" placeholder="name" />
        <button>delete</button>
        <button>update</button>
      </li>
    </ul>
  </div>
);

export default Home;
