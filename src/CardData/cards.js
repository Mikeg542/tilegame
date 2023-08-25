/*
Types: 0=energy, 1=pokemon, 2=etc...
*/
export const cards = [
	{ name: "Grass Energy", type: 0, provides: "g" },
	{
		name: "Turtwig",
		stage: 0,
		type: 1,
		attacks: [
			{ name: "Tackle", damage: 10, priority: 0, cost: "C" },
			{ name: "Rollout", damage: 30, priority: 100, cost: "GC" },
		],
	},
];
