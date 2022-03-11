
import React from "react";
import "../../Style/Board.css";

const Board = () => {
  return (
    <div>
      <div className="sub_header px-4">
          <h3>Board</h3>
          <p className="fw-bold">Project / <span className="fw-bolder">[Project Name]</span></p>
        </div>
      <div className="container" id="canbanboard">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="board">
              <div className="board-header">
                <h4>To Do</h4>
              </div>
              <div className="board-body">
                {/* Canbanboard card start */}
                <div className="board-card" id="todo">
                  <div id="card-heading">
                    <button className="btn"><i className="bi bi-pencil-square"></i></button>
                  </div>
                  <div id="card-body">
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                </div>
                {/* Canbanboard card End */}
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="board">
              <div className="board-header">
                <h4>In Progress</h4>
              </div>
              <div className="board-body">
                <div className="board-card" id="in-progress">
                  <div id="card-heading">
                    <button className="btn"><i className="bi bi-pencil-square"></i></button>
                  </div>
                  <div id="card-body">
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="board">
              <div className="board-header">
                <h4>Finished</h4>
              </div>
              <div className="board-body">
                <div className="board-card" id="done">
                  <div id="card-heading">
                    <button className="btn"><i className="bi bi-pencil-square"></i></button>
                  </div>
                  <div id="card-body">
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="board">
              <div className="board-header">
                <h4>Approved</h4>
              </div>
              <div className="board-body">
                <div className="board-card" id="approved">
                  <div id="card-heading">
                    <button className="btn"><i className="bi bi-pencil-square"></i></button>
                  </div>
                  <div id="card-body">
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Board;
