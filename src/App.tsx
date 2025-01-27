import './App.css'

const App = () => {

  return (
    <>
      <div className="container align-items-center text-center">
        <h1 className="mt-4 bg-success-subtle p-2 mb-4">Chat!!</h1>
          <hr/>
          <form className="row mt-5">
              <div className="w-75">
                  <input
                  type="text"
                  className="form-control border-black"
                  placeholder="What's up?"
                  />
              </div>
              <button
              type="submit"
              className="btn btn-primary w-25"
              >Send</button>
          </form>
          <div className="mt-5">
              <h4 className="text-start">Messages</h4>
              <div>
                  <ul className="list-unstyled list-group text-start bg-success-subtle p-3">
                      <li className="m-3 p-3 border border-black rounded-1">message from api</li>
                  </ul>
              </div>
          </div>
      </div>
    </>
  )
};

export default App
