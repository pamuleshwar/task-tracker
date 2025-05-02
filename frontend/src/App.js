import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProjectsList from './components/projects/ProjectsList';
import TasksList from './components/tasks/TasksList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/common/Body';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body />}>
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/projects' element={<ProjectsList />} />
          <Route path='/projects/:projectId/tasks' element={<TasksList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;