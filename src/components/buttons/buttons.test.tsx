import { render, screen } from '@testing-library/react';
import { defaultUserState } from '../../app-store/userReducer';
import { Item } from '../../types/items';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';
import Buttons from './buttons';
import { users as mockUsers } from '../../mocks/users';
import { items as mockItems } from '../../mocks/items';
import { ItemsState } from '../../types/itemsReducerTypes';

type ObjectProp = Item & { countChange: number };

describe('Testing buttons component', () => {
  let fakeObject: null | ObjectProp = null;
  let fakeDefault: null | ItemsState;

  beforeEach(() => {
    fakeObject = {
      ...mockItems[9],
      countChange: 1,
    };
    fakeDefault = {
      items: mockItems.map((i) => ({ ...i })),
      cartItems: [],
      currentItem: null,
      isItemsLoaded: true,
      isItemLoaded: false,
      itemPrice: 0,
      itemCount: 0,
    } as ItemsState;
  });

  test('rendering buttons if user is not admin', () => {
    render(
      renderWithRedux(
        <Buttons {...(fakeObject as ObjectProp)}></Buttons>,
        fakeDefault as ItemsState,
        {
          user: mockUsers[0],
          isAuth: true,
        }
      )
    );
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');
    expect(addButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test('rendering buttons if user is admin', () => {
    render(
      renderWithRedux(
        <Buttons {...(fakeObject as ObjectProp)}></Buttons>,
        fakeDefault as ItemsState,
        {
          user: mockUsers[1],
          isAuth: true,
        }
      )
    );
    const addButton = screen.queryByTestId('add-button');
    const deleteButton = screen.queryByTestId('delete-button');
    expect(addButton).toBeNull();
    expect(deleteButton).toBeNull();
  });

  test('rendering buttons if there is no user', () => {
    render(
      renderWithRedux(
        <Buttons {...(fakeObject as ObjectProp)}></Buttons>,
        fakeDefault as ItemsState,
        defaultUserState
      )
    );
    const addButton = screen.queryByTestId('add-button');
    const deleteButton = screen.queryByTestId('delete-button');
    const infoBlock = screen.getByTestId('info-block');
    expect(infoBlock).toBeInTheDocument();
    expect(addButton).toBeNull();
    expect(deleteButton).toBeNull();
  });

  test('if item count === maxCount', () => {
    render(
      renderWithRedux(
        <Buttons {...(fakeObject as ObjectProp)}></Buttons>,
        fakeDefault as ItemsState,
        {
          user: mockUsers[0],
          isAuth: true,
        }
      )
    );
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');

    expect(addButton).not.toHaveAttribute('disabled');
    expect(deleteButton).toHaveAttribute('disabled');
  });

  test('if item count === 0', () => {
    render(
      renderWithRedux(
        <Buttons {...{ ...(fakeObject as ObjectProp), count: 0 }}></Buttons>,
        fakeDefault as ItemsState,
        {
          user: mockUsers[0],
          isAuth: true,
        }
      )
    );
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');

    expect(addButton).toHaveAttribute('disabled');
    expect(deleteButton).not.toHaveAttribute('disabled');
  });

  test('if item count between 0 and maxCount', () => {
    render(
      renderWithRedux(
        <Buttons {...{ ...(fakeObject as ObjectProp), count: 5 }}></Buttons>,
        fakeDefault as ItemsState,
        {
          user: mockUsers[0],
          isAuth: true,
        }
      )
    );
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');

    expect(addButton).not.toHaveAttribute('disabled');
    expect(deleteButton).not.toHaveAttribute('disabled');
  });

  test('if countChange >  maxCount', () => {
    render(
      renderWithRedux(
        <Buttons
          {...{
            ...(fakeObject as ObjectProp),
            count: 5,
            countChange: 18,
            maxCount: 10,
          }}
        ></Buttons>,
        fakeDefault as ItemsState,
        {
          user: mockUsers[0],
          isAuth: true,
        }
      )
    );
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');
    expect(addButton).toHaveAttribute('disabled');
    expect(deleteButton).toHaveAttribute('disabled');
  });

  test('if countChange > count and countChange > maxCount - count', () => {
    render(
      renderWithRedux(
        <Buttons
          {...{
            ...(fakeObject as ObjectProp),
            count: 5,
            countChange: 8,
            maxCount: 10,
          }}
        ></Buttons>,
        fakeDefault as ItemsState,
        {
          user: mockUsers[0],
          isAuth: true,
        }
      )
    );
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');
    expect(addButton).toHaveAttribute('disabled');
    expect(deleteButton).toHaveAttribute('disabled');
  });

  test('if countChange > count and countChange < maxCount - count', () => {
    render(
      renderWithRedux(
        <Buttons
          {...{
            ...(fakeObject as ObjectProp),
            count: 2,
            countChange: 5,
            maxCount: 10,
          }}
        ></Buttons>,
        fakeDefault as ItemsState,
        {
          user: mockUsers[0],
          isAuth: true,
        }
      )
    );
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');
    expect(addButton).toHaveAttribute('disabled');
    expect(deleteButton).not.toHaveAttribute('disabled');
  });

  test('if countChange < count and countChange > maxCount - count', () => {
    render(
      renderWithRedux(
        <Buttons
          {...{
            ...(fakeObject as ObjectProp),
            count: 8,
            countChange: 5,
            maxCount: 10,
          }}
        ></Buttons>,
        fakeDefault as ItemsState,
        {
          user: mockUsers[0],
          isAuth: true,
        }
      )
    );
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');
    expect(addButton).not.toHaveAttribute('disabled');
    expect(deleteButton).toHaveAttribute('disabled');
  });

  test('if countChange < count and countChange < maxCount - count', () => {
    render(
      renderWithRedux(
        <Buttons
          {...{
            ...(fakeObject as ObjectProp),
            count: 5,
            countChange: 1,
            maxCount: 10,
          }}
        ></Buttons>,
        fakeDefault as ItemsState,
        {
          user: mockUsers[0],
          isAuth: true,
        }
      )
    );
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');
    expect(addButton).not.toHaveAttribute('disabled');
    expect(deleteButton).not.toHaveAttribute('disabled');
  });

  test('if count = 0 add button should become to "none"', () => {
    render(
      renderWithRedux(
        <Buttons
          {...{
            ...(fakeObject as ObjectProp),
            count: 0,
            countChange: 1,
            maxCount: 10,
          }}
        ></Buttons>,
        fakeDefault as ItemsState,
        {
          user: mockUsers[0],
          isAuth: true,
        }
      )
    );
    const addButton = screen.getByText('none');
    const deleteButton = screen.getByTestId('delete-button');
    expect(addButton).toHaveAttribute('disabled');
    expect(deleteButton).not.toHaveAttribute('disabled');
  });
});
