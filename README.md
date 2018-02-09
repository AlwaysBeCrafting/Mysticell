_Mysticell is currently under heavy development, and many (most) of its features are incomplete. You can see some of the working parts at http://mysticell-demo.herokuapp.com_

_Mysticell is designed for modern web browsers, and makes extensive use of CSS grid and flexbox. Please make sure your browser is up-to-date._

Mysticell lets you make complex data sheets by connecting parts in a graph. It's like drawing a mathematical flowchart.

While data tables are on the roadmap, that's not what Mysticell is designed for. Instead of giant grids with thousands of rows with the same kinds of data, Mysticell works best with many small bits of different kinds of data. Mysticell is mostly meant to be an RPG character sheet builder, but you're encouraged to find and share other uses!

## Sheets

![Sheet screenshot](/readme-assets/screenshots/sheet.png?raw=true)

Sheets are where you'll lay out and format your data. Unlike with spreadsheets, Mysticell doesn't use a cell's data as its "address". You can have as many copies of a property as you want, wherever you want, and they'll all show the correct numbers, even when you move them around or delete them.

Sheets can also be any number of rows or columns, and can be displayed side-by-side, so making lots of small groups of data is easy. Maybe you'll want to put your skills, combat stats, and inventory each on separate "cards" and stack them up side-by-side.

## The sidebar

![Sidebar screenshot](/readme-assets/screenshots/sidebar.png?raw=true)

This is the hierarchy of your document. It's where you'll find all the building blocks that go into the graphs you create. There are a few types:

* ![Function icon](/readme-assets/icons/icon-function.png?raw=true) **Functions** are formulas that take some input, do something to it, and give back some output as a result. They don't store any data, so you can use them in many places and get different results each time.
* ![Property icon](/readme-assets/icons/icon-property.png?raw=true) **Properties** are similar to functions, except that their input and output values are persistent. When you type a value into a property input, the outputs are re-calculated based on the formula inside. These inputs and outputs are the pieces you will attach to your sheets.
* ![Table icon](/readme-assets/icons/icon-table.png?raw=true) **Tables** aren't implemented yet, but they'll end up looking similar to the classic idea of a spreadsheet: a few headers describing each column, and lots of rows with data in them. Unlike spreadsheets, though, tables contain only static data; no formulas allowed. Instead, you plug a table into another formula and use its data there.

## The graph editor

![Graph editor screenshot](/readme-assets/screenshots/graph-editor.png?raw=true)

This is where you'll wire up all the important pieces of math that make up your document. When you open a function or property from the sidebar, this is what you'll see. Pull other cards in from the sidebar and draw wires between the nodes to edit the graph; your changes will affect the rest of the document in real time.
