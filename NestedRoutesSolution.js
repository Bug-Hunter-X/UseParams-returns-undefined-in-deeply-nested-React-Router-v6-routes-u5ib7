The solution involves using the `Outlet` component to conditionally render nested routes only when the parent route matches.  This ensures that the `useParams` hook in nested components only attempts to access parameters when the required parent routes have matched.

```javascript
import { BrowserRouter, Routes, Route, useParams, Outlet } from 'react-router-dom';

function ParentRoute() {
  return (
    <Routes>
      <Route path="/parent/:parentId" element={<ChildRoute />} />
    </Routes>
  );
}

function ChildRoute() {
  let { parentId } = useParams();
  return (
    <div>
      <h1>Parent ID: {parentId}</h1>
      <Routes>
        <Route path="/parent/:parentId/child/:childId" element={<GrandchildRoute />} />
        <Route path="/parent/:parentId" element={<ChildFallback />} />
      </Routes>
    </div>
  );
}

function ChildFallback() {
  return <p>No child found</p>;
}

function GrandchildRoute() {
  let { childId } = useParams();
  return (
    <div>
      <h1>Child ID: {childId}</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ParentRoute />
    </BrowserRouter>
  );
}
```

This revised code utilizes nested `Routes` within the `ChildRoute` component.  The addition of a `Route` with the path `/parent/:parentId` and a fallback component `ChildFallback` handles the case where the child route doesn't match, preventing errors in the `GrandchildRoute` component.  When a URL like `/parent/123` is used, the `ChildFallback` component is rendered instead, and no error is produced.