import React from "react";
import { TodoContext } from "../TodoContext";
import { HeaderComponent } from "../components/HeaderComponent";
import { ProgressComponent } from "../components/ProgressComponent";
import { BarComponent } from "../components/BarComponent";
import { ListComponent } from "../components/ListComponent";
import { TodoComponent } from "../components/TodoComponent";
import "./App.css";

function AppUI() {
  return (
    <TodoContext.Consumer>
      {({ dataState, searchedTodos, toogleTodo, deleteTodo, totalTodos }) => (
        <div className="app">
          <HeaderComponent>
            <ProgressComponent />
          </HeaderComponent>
          <BarComponent />
          <ListComponent>
            {dataState.error && <p>Hubo un error</p>}
            {dataState.loading && <div className="loader no-todos"></div>}
            {!dataState.loading && totalTodos === 0 ? (
              <p className="no-todos">¡Create a new ToDo!</p>
            ) :!dataState.loading && searchedTodos.length === 0 ? (
              <p className="no-todos">There are no matches...</p>
            ) : (
              ""
            )}

            {searchedTodos.map((todo) => (
              <TodoComponent
                todo={todo}
                key={todo.text}
                onToogleTodo={() => toogleTodo(todo.text)}
                onDeleteTodo={() => deleteTodo(todo.text)}
              />
            ))}
          </ListComponent>
        </div>
      )}
    </TodoContext.Consumer>
  );
}

export { AppUI };
