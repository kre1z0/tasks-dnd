import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

import Root from './Root';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const render = Component => {
    ReactDOM.render(
        <DragDropContextProvider backend={HTML5Backend}>
            <AppContainer>
                <Component />
            </AppContainer>
        </DragDropContextProvider>,
        document.getElementById('root'),
    );
};

render(Root);

if (module.hot) {
    module.hot.accept('./Root', () => render(Root));
}
