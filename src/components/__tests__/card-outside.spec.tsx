import React from 'react';
import renderer from 'react-test-renderer';
import { CardOutside } from '../card-outside';

test('CardOutside can action', () => {
    const component = renderer.create(<CardOutside>{`aaa`}</CardOutside>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

test('CardOutside cannot action', () => {
    const component = renderer.create(<CardOutside action={false}>{`aaa`}</CardOutside>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});
