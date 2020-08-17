import React from 'react';
import Table from './TableNew'

export default {
    title: 'Table',
    component: Table,
  };

const rows = [
	{
		color: "red",
		value: "#f00",
	},
	{
		color: "green",
		value: "#0f0"
	},
	{
		color: "blue",
		value: "#00f"
	},
	{
		color: "cyan",
		value: "#0ff"
	},
	{
		color: "magenta",
		value: "#f0f"
	},
	{
		color: "yellow",
		value: "#ff0"
	},
	{
		color: "black",
		value: "#000"
	}
]

const headers = [{id: "1", label: "Color", key: "color"}, {id: "2", label: "Value", key: "value"}];
export const Default = () => <Table rows={rows} headers={headers} rowsPerPageArray={[3, 5, 10]} initialRowsPerPage={5} />;
export const Other = () => <Table rows={rows} headers={headers} rowsPerPageArray={[3, 5, 10]} initialRowsPerPage={5} />;
