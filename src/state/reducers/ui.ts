import Action from 'state/action';

import reduceExpandedFields from 'state/reducers/expandedFields';


interface DocUI {
	expandedFields: Set<number>;
}

const defaultUi = {
	expandedFields: new Set(),
};

export default ( ui: DocUI = defaultUi, action: Action ): DocUI => ({
	expandedFields: reduceExpandedFields( ui.expandedFields, action ),
});
