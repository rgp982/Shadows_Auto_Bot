//--# Shadows' Auto Bot
function Autostart() {
	Orion.Wait(1000);
	Orion.IgnoreReset();
	Shared.ClearVars();
	
	setOAOptions();
	
	Shared.AddVar('Steps Before Record', 16);
	Shared.AddVar('selector', 0);
	Shared.AddVar('Named Monsters Only', false);
	Shared.AddVar('Wait Timer', 100);
	Shared.AddVar('Loot List', 'Default');
	Orion.Exec('durability', true);
	
	//need to move these so if i add they get updated with the gump in here it wont update until Autostart is ran again
	Shared.AddVar('Named Monsters', 'Risen|Neira|Piper|Rikktor|Semidar|Mephitis|Silvani|Serado|Ilhenir|Meraktus|Twaulo|Primeval|Abyssal|Turtle|Dark Father|Melisande|Travesty|Toothed|Shadowlord');
	Shared.AddVar('Ignore Prop', 'The Priest Of Mondain|(summoned)|(tame)|(bonded)');
	
	mainGUI();
}
//--# GUMP FUNCTIONS
function mainGUI() {
	Orion.Wait(100);
	var CUSTOM_GUI = Orion.CreateCustomGump(271104);
	
	CUSTOM_GUI.Clear();
	CUSTOM_GUI.SetNoClose(true);
	CUSTOM_GUI.SetCallback('onClick');
	
	const width = 10;
	const cellSize = 31;
	const height = 7;
	const color = 1188;
	const color2 = 1920;
	const color3 = 1106; 
	
	for (var y = 0; y < height; ++y) {
		for (var x = 0; x < width; ++x) {
			if (y == 0 && x == 0) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7748, color); // TL
				
			} else if (x == 0 && y == height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774E, color); //BL
				
			} else if (x == 0 && y > 0 && y < height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774B, color); // LC
				
			} else if (x == width-1 && y > 0 && y < height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774D, color); // RC
				
			} else if (y == height-1 && x == width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7750, color); // BR
				
			} else if (y == 0 && x == width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774A, color); // TR
				
			} else if (y == 0 && x > 0 && x < width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7749, color); // TC
				
			} else if (y == height-1 && x > 0 && x < width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774F, color); // BC
				
			} else {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774C, color2); // C
			}
		}
	}
	CUSTOM_GUI.AddLine(40, 51, 270, 51, 'white', 1); //Top
	CUSTOM_GUI.AddLine(40, 165, 270, 165, 'white', 1); //Bottom
	CUSTOM_GUI.AddLine(40, 40, 40, 165, 'white', 1); //Left
	CUSTOM_GUI.AddLine(270, 51, 270, 165, 'white', 1); //Right
	
	CUSTOM_GUI.AddGumpPic(-20, -18, 0x28A0, color3);
	CUSTOM_GUI.AddGumpPic(247, -18, 0x28AA, color3);
/*/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
/ / / / / / / / / / / / / /END OF BACKGROUND / / / / / / / / / / / / / / / / / / / /
 / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /*/
	var serialNumber = 100;
 	//HEADER
	var guiWidth = width * cellSize;
	var text = '<h2>AUTO BOT</h2>';
	var averageCharWidth = 5;
	var centeredX = calculateCenteredX(guiWidth, text, averageCharWidth);
	CUSTOM_GUI.AddText(centeredX, 30, 1152, text);
	
 	var x = 50;
 	var y = 50;
 	
 	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y, 70, 20, 1);
 	CUSTOM_GUI.AddText(getStatus('attack') ? x +5 : x, 52, getStatus('attack') ? '33' : '69', getStatus('attack') ? '<h2>STOP</h2>' : '<h2>START</h2>');
 	CUSTOM_GUI.AddText(x, 52, '0', ' ', 70);
	CUSTOM_GUI.AddTooltip('START / STOP');
	//TEXT ENTRY
	CUSTOM_GUI.AddLine(48, 75, 110, 75, 'white', 1); //Top
	CUSTOM_GUI.AddLine(48, 95, 110, 95, 'white', 1); //Bottom
	CUSTOM_GUI.AddLine(48, 75, 48, 95, 'white', 1); //Left
	CUSTOM_GUI.AddLine(110, 75, 110, 95, 'white', 1); //Right
	CUSTOM_GUI.AddHitBox(0, x, y+=25, 60, 20);
	CUSTOM_GUI.AddTextEntry(serialNumber++, x, y, '1152', Shared.GetVar('Wait Timer'), 60, 20, 6);
	CUSTOM_GUI.AddTooltip('Time to wait in milliseconds <br> Default 100ms (.1s)');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y+=25, 140, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>ABILITY LIST</h2>');
	CUSTOM_GUI.AddText(x, y, '23', ' ', 140);
	CUSTOM_GUI.AddTooltip('Spells and Abilities<br> Selection List<br>Click again to minimize ability list');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y+=25, 80, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>OPTIONS</h2>');
	CUSTOM_GUI.AddText(x, y, '23', ' ', 80);
	CUSTOM_GUI.AddTooltip('Miscellaneous Options');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=85, y+=-73, 120, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>RAIL MAKER</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 120);
	CUSTOM_GUI.AddTooltip('CREATE CUSTOM RAILS<br>AND SAVE THEM');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, 220, 135, 40, 20, 1);
	CUSTOM_GUI.AddText(220, 135, '23', '<h2>MIN</h2>');
	CUSTOM_GUI.AddText(220, 135, '23', ' ', 40);
	CUSTOM_GUI.AddTooltip('MINIMIZE');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=-5, y+=25, 130, 20, 1);
	CUSTOM_GUI.AddText(x, y, Shared.GetVar('Named Monsters Only') ? '33' : '69', '<h2>NAMED MOBS</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 130);
	CUSTOM_GUI.AddTooltip('ONLY SEARCHES FOR NAMED MONSTERS<br>NO OPTION TO ADD NAMES YET<br>HAVE TO GO INTO SCRIPTS MAUALLY');
	
	CUSTOM_GUI.Update();
}

function abilityGUI() {
	Orion.Wait(100);
	var CUSTOM_GUI = Orion.CreateCustomGump(271104);
	
	CUSTOM_GUI.Clear();
	CUSTOM_GUI.SetNoClose(true);
	CUSTOM_GUI.SetCallback('onClick');
	
	const width = 10;
	const cellSize = 31;
	const height = 12;
	const color = 1188;
	const color2 = 1920;
	const color3 = 1106; 
	
	for (var y = 0; y < height; ++y) {
		for (var x = 0; x < width; ++x) {
			if (y == 0 && x == 0) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7748, color); // TL
				
			} else if (x == 0 && y == height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774E, color); //BL
				
			} else if (x == 0 && y > 0 && y < height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774B, color); // LC
				
			} else if (x == width-1 && y > 0 && y < height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774D, color); // RC
				
			} else if (y == height-1 && x == width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7750, color); // BR
				
			} else if (y == 0 && x == width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774A, color); // TR
				
			} else if (y == 0 && x > 0 && x < width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7749, color); // TC
				
			} else if (y == height-1 && x > 0 && x < width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774F, color); // BC
				
			} else {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774C, color2); // C
			}
		}
	}
	CUSTOM_GUI.AddLine(40, 51, 270, 51, 'white', 1); //Top
	CUSTOM_GUI.AddLine(40, 325, 270, 325, 'white', 1); //Bottom
	CUSTOM_GUI.AddLine(40, 40, 40, 325, 'white', 1); //Left
	CUSTOM_GUI.AddLine(270, 51, 270, 325, 'white', 1); //Right
	
	CUSTOM_GUI.AddGumpPic(-20, -18, 0x28A0, color3);
	CUSTOM_GUI.AddGumpPic(247, -18, 0x28AA, color3);
/*/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
/ / / / / / / / / / / / / /END OF BACKGROUND / / / / / / / / / / / / / / / / / / / /
 / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /*/
 	var serialNumber = 100;
 	//HEADER
	var guiWidth = width * cellSize;
	var text = '<h2>AUTO BOT</h2>';
	var averageCharWidth = 5;
	var centeredX = calculateCenteredX(guiWidth, text, averageCharWidth);
	CUSTOM_GUI.AddText(centeredX, 30, 1152, text);
 	
 	var x = 50;
 	var y = 50;
 	
 	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y, 70, 20, 1);
 	CUSTOM_GUI.AddText(getStatus('attack') ? x +5 : x, 52, getStatus('attack') ? '33' : '69', getStatus('attack') ? '<h2>STOP</h2>' : '<h2>START</h2>');
 	CUSTOM_GUI.AddText(x, 52, '0', ' ', 70);
	CUSTOM_GUI.AddTooltip('START / STOP');
	//TEXT ENTRY
	CUSTOM_GUI.AddLine(x-2, y+=25, x+60, y, 'white', 1); //Top
	CUSTOM_GUI.AddLine(x-2, y+20, x+60, y+20, 'white', 1); //Bottom
	CUSTOM_GUI.AddLine(x-2, y, x-2, y+20, 'white', 1); //Left
	CUSTOM_GUI.AddLine(x+60, y, x+60, y+20, 'white', 1); //Right
	CUSTOM_GUI.AddTextEntry(serialNumber++, x, y, '1152', Shared.GetVar('Wait Timer'), 60, 20, 6);
	CUSTOM_GUI.AddTooltip('Time to wait in milliseconds <br> Default 100ms (.1s)');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y+=25, 140, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>ABILITY LIST</h2>');
	CUSTOM_GUI.AddText(x, y, '23', ' ', 140);
	CUSTOM_GUI.AddTooltip('Spells and Abilities<br> Selection List<br>Click again to minimize ability list');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y+=25, 80, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>OPTIONS</h2>');
	CUSTOM_GUI.AddText(x, y, '23', ' ', 80);
	CUSTOM_GUI.AddTooltip('Miscellaneous Options');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=85, y+=-73, 120, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>RAIL MAKER</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 120);
	CUSTOM_GUI.AddTooltip('CREATE CUSTOM RAILS<br>AND SAVE THEM');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, 220, 135, 40, 20, 1);
	CUSTOM_GUI.AddText(220, 135, '23', '<h2>MIN</h2>');
	CUSTOM_GUI.AddText(220, 135, '23', ' ', 40);
	CUSTOM_GUI.AddTooltip('MINIMIZE');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=-5, y+=25, 130, 20, 1);
	CUSTOM_GUI.AddText(x, y, Shared.GetVar('Named Monsters Only') ? '33' : '69', '<h2>NAMED MOBS</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 130);
	CUSTOM_GUI.AddTooltip('ONLY SEARCHES FOR NAMED MONSTERS<br>NO OPTION TO ADD NAMES YET<br>HAVE TO GO INTO SCRIPTS MAUALLY');
	
 	CUSTOM_GUI.AddLine(70, 165, 240, 165, 'white', 2); //Bottom
 	
 	serialNumber = 1200;
 	x = 50;
 	y = 175;
 	
 	CUSTOM_GUI.AddGumpPic(x, y, '0x5102', getColorStatus('consecrateWeapon'), serialNumber++, getColorStatus('consecrateWeapon'));
	CUSTOM_GUI.AddTooltip('Cast Consectrate Weapon<br>At 120 Chivalry: Damage Modifier +15%<br>if weapon is 100% element damage, WILL NOT cast<br>Weapon deals damage based on monsters lowest resist<br>Does NOT stack with Onslaught or other resistance reduction debuffs');
	
	CUSTOM_GUI.AddGumpPic(x, y+40, '0x5104', getColorStatus('divineFury'), serialNumber++, getColorStatus('divineFury'));
	CUSTOM_GUI.AddTooltip('Cast Divine Fury<br>At 120 Chivalry: HCI +15%, DI +20%, SSI +10%, DCI -10%<br>Replenishes some of your stamina');
	
	CUSTOM_GUI.AddGumpPic(x, y+80, '0x5105', getColorStatus('enemyOfOne'), serialNumber++, getColorStatus('enemyOfOne'));
	CUSTOM_GUI.AddTooltip('Cast Enemy Of One<br>At 120 Chivalry: Damage Modifier +82%, take 200% increased damage from other enemies types<br>Worth using when monster is not vulnerable to a slayer');
	
	CUSTOM_GUI.AddGumpPic(x+40, y, '0x5421', getColorStatus('confidence'), serialNumber++, getColorStatus('confidence'));
	CUSTOM_GUI.AddTooltip('Cast Confidence<br>At 120 Bushido: HP regen +100 for 4 seconds, Successful Parry restores some HP and Stam<br>No casting time makes it great to cast while retreating');
	
	CUSTOM_GUI.AddGumpPic(x+40, y+40, '0x5423', getColorStatus('counterAttack'), serialNumber++, getColorStatus('counterAttack'));
	CUSTOM_GUI.AddTooltip('Cast Counter Attack<br>Successful Parry will result in an extra swing');
	
	CUSTOM_GUI.AddGumpPic(x+40, y+80, '0x5422', getColorStatus('evasion'), serialNumber++, getColorStatus('evasion'));
	CUSTOM_GUI.AddTooltip('Cast Evasion<br>At 120 Bushido: lasts for 8 seconds with 20 second CD<br>Chance to evade all forms of DIRECT damage');
		
	CUSTOM_GUI.AddGumpPic(x+80, y, getSpecialAbilities()[0], Shared.GetVar('primary') ? 69 : 33, serialNumber++, Shared.GetVar('primary') ? 69 : 33 );
	CUSTOM_GUI.AddTooltip('Primary Ability<br>' + Orion.GetCurrentAbilityNames()[0]);
		
	CUSTOM_GUI.AddGumpPic(x+80, y+40, getSpecialAbilities()[1], Shared.GetVar('secondary') ? 69 : 33, serialNumber++, Shared.GetVar('secondary') ? 69 : 33 );
	CUSTOM_GUI.AddTooltip('Secondary Ability<br>' + Orion.GetCurrentAbilityNames()[1]);
	
	CUSTOM_GUI.AddGumpPic(x+120, y+80, '0x5425', getColorStatus('momentumStrike'), serialNumber++, getColorStatus('momentumStrike'));
	CUSTOM_GUI.AddTooltip('Momentum Strike<br>Hits two targets and deals 150% damage to the second<br>Can be used with archery and throwing<br>Second target must be within 1 tile of player');
	
	CUSTOM_GUI.AddGumpPic(x+120, y, '0x75A2', getColorStatus('bandage'), serialNumber++, getColorStatus('bandage'));
	CUSTOM_GUI.AddText(25, 40, '0', '');
	CUSTOM_GUI.AddTooltip('Apply Bandages to Self or Target<br>Enhanced Bandages give +10% bonus to healling skill<br>80 Healing and Anatomy to cure Poison and Bleed effects<br>90 Healing and Anatomy to resurrect a player');
	
	CUSTOM_GUI.AddGumpPic(x+160, y+80, '0x500C', getColorStatus('vampiricEmbrace'), serialNumber++, getColorStatus('vampiricEmbrace'));
	CUSTOM_GUI.AddTooltip('Vampiric Embrace<br>Buff: Life Drain +20%, Stam Regen +15, Mana Regen +3<br>Debuffs: Fire Resist -25%, Healing spells that use Garlic will DAMAGE you instead of heal');
 	
 	CUSTOM_GUI.AddGumpPic(x+80, y+80, '0x5424', getColorStatus('lightningStrike'), serialNumber++, getColorStatus('lightningStrike'));
	CUSTOM_GUI.AddTooltip('Lightning Strike<br>Increases HCI +50%<br>does not exceed HCI cap of 45%<br>unless user has HLA debuff<br>Chance to cause a Critical Hit +200% Damage');
	
	CUSTOM_GUI.AddGumpPic(x+160, y+40, '0x500F', getColorStatus('wraithForm'), serialNumber++, getColorStatus('wraithForm'));
	CUSTOM_GUI.AddTooltip('Wraith Form<br>Buff: Mana Drain up to 24% at 120 SS, No Stam Check, Physical Resist +15<br>Debuffs: Can not mount, Fire and Energy Resist -5');
	
	CUSTOM_GUI.AddGumpPic(x+160, y, '0x8F7', getColorStatus('removeForm'), serialNumber++, getColorStatus('removeForm'));
	CUSTOM_GUI.AddTooltip('Return to Original Form');
	
 	CUSTOM_GUI.Update();
}

function miscGUI() {
	Orion.Wait(100);
	var CUSTOM_GUI = Orion.CreateCustomGump(271104);
	
	CUSTOM_GUI.Clear();
	CUSTOM_GUI.SetNoClose(true);
	CUSTOM_GUI.SetCallback('onClick');
	
	const width = 10;
	const cellSize = 31;
	const height = 12;
	const color = 1188;
	const color2 = 1920;
	const color3 = 1106; 
	
	for (var y = 0; y < height; ++y) {
		for (var x = 0; x < width; ++x) {
			if (y == 0 && x == 0) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7748, color); // TL
				
			} else if (x == 0 && y == height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774E, color); //BL
				
			} else if (x == 0 && y > 0 && y < height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774B, color); // LC
				
			} else if (x == width-1 && y > 0 && y < height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774D, color); // RC
				
			} else if (y == height-1 && x == width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7750, color); // BR
				
			} else if (y == 0 && x == width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774A, color); // TR
				
			} else if (y == 0 && x > 0 && x < width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7749, color); // TC
				
			} else if (y == height-1 && x > 0 && x < width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774F, color); // BC
				
			} else {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774C, color2); // C
			}
		}
	}
	CUSTOM_GUI.AddLine(40, 51, 270, 51, 'white', 1); //Top
	CUSTOM_GUI.AddLine(40, 325, 270, 325, 'white', 1); //Bottom
	CUSTOM_GUI.AddLine(40, 40, 40, 325, 'white', 1); //Left
	CUSTOM_GUI.AddLine(270, 51, 270, 325, 'white', 1); //Right
	
	CUSTOM_GUI.AddGumpPic(-20, -18, 0x28A0, color3);
	CUSTOM_GUI.AddGumpPic(247, -18, 0x28AA, color3);
/*/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
/ / / / / / / / / / / / / /END OF BACKGROUND / / / / / / / / / / / / / / / / / / / /
 / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /*/
 	var serialNumber = 100;
 	//HEADER
	var guiWidth = width * cellSize;
	var text = '<h2>AUTO BOT</h2>';
	var averageCharWidth = 5;
	var centeredX = calculateCenteredX(guiWidth, text, averageCharWidth);
	CUSTOM_GUI.AddText(centeredX, 30, 1152, text);
 	
 	var x = 50;
 	var y = 50;
 	
 	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y, 70, 20, 1);
 	CUSTOM_GUI.AddText(getStatus('attack') ? x +5 : x, 52, getStatus('attack') ? '33' : '69', getStatus('attack') ? '<h2>STOP</h2>' : '<h2>START</h2>');
 	CUSTOM_GUI.AddText(x, 52, '0', ' ', 70);
	CUSTOM_GUI.AddTooltip('START / STOP');
	//TEXT ENTRY
	CUSTOM_GUI.AddLine(x-2, y+=25, x+60, y, 'white', 1); //Top
	CUSTOM_GUI.AddLine(x-2, y+20, x+60, y+20, 'white', 1); //Bottom
	CUSTOM_GUI.AddLine(x-2, y, x-2, y+20, 'white', 1); //Left
	CUSTOM_GUI.AddLine(x+60, y, x+60, y+20, 'white', 1); //Right
	CUSTOM_GUI.AddTextEntry(serialNumber++, x, y, '1152', Shared.GetVar('Wait Timer'), 60, 20, 6);
	CUSTOM_GUI.AddTooltip('Time to wait in milliseconds <br> Default 100ms (.1s)');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y+=25, 140, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>ABILITY LIST</h2>');
	CUSTOM_GUI.AddText(x, y, '23', ' ', 140);
	CUSTOM_GUI.AddTooltip('Spells and Abilities<br> Selection List<br>Click again to minimize ability list');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y+=25, 80, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>OPTIONS</h2>');
	CUSTOM_GUI.AddText(x, y, '23', ' ', 80);
	CUSTOM_GUI.AddTooltip('Miscellaneous Options');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=85, y+=-73, 120, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>RAIL MAKER</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 120);
	CUSTOM_GUI.AddTooltip('CREATE CUSTOM RAILS<br>AND SAVE THEM');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, 220, 135, 40, 20, 1);
	CUSTOM_GUI.AddText(220, 135, '23', '<h2>MIN</h2>');
	CUSTOM_GUI.AddText(220, 135, '23', ' ', 40);
	CUSTOM_GUI.AddTooltip('MINIMIZE');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=-5, y+=25, 130, 20, 1);
	CUSTOM_GUI.AddText(x, y, Shared.GetVar('Named Monsters Only') ? '33' : '69', '<h2>NAMED MOBS</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 130);
	CUSTOM_GUI.AddTooltip('ONLY SEARCHES FOR NAMED MONSTERS<br>NO OPTION TO ADD NAMES YET<br>HAVE TO GO INTO SCRIPTS MAUALLY');
	
 	CUSTOM_GUI.AddLine(70, 165, 240, 165, 'white', 2); //Bottom
 	
 	serialNumber = 1300;
 	x = 50;
 	y = 175;
 	
 	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y, 45, 20, 1);
	CUSTOM_GUI.AddText(x, y, getColorStatus('lootCorpse'), '<h2>LOOT</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 45);
	CUSTOM_GUI.AddTooltip('LOOT<br>AGENTS > AUTOLOOT');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y+=25, 65, 20, 1);
	CUSTOM_GUI.AddText(x, y, getColorStatus('mount'), '<h2>MOUNT</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 65);
	CUSTOM_GUI.AddTooltip('MOUNT<br>RE MOUNT / FLY WHEN DISMOUNTED');
	//TEXT ENTRY
	CUSTOM_GUI.AddLine(x+60, y-25, x+60+100, y-25, 'white', 1); //Top
	CUSTOM_GUI.AddLine(x+60, y-5, x+60+100, y-5, 'white', 1); //Bottom
	CUSTOM_GUI.AddLine(x+60, y-25, x+60, y-5, 'white', 1); //Left
	CUSTOM_GUI.AddLine(x+60+100, y-25, x+60+100, y-5, 'white', 1); //Right
	CUSTOM_GUI.AddTextEntry(serialNumber++, x+60, y-25, '1152', Shared.GetVar('Loot List'), 100, 20, 16);
	CUSTOM_GUI.AddTooltip('NAME OF YOUR LIST<br>FOUND IN ASSISTANT WINDOW > LISTS > FIND');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=170, y-=25, 45, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>SET</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 45);
	CUSTOM_GUI.AddTooltip('SETS AUTOLOOT AGENT TO THIS LIST<br>CAN FIND THE LIST IN AGENTS > AUTOLOOT<br>IF YOU CHANGE NAME OF YOUR LOOT LIST TO "Default"<br>IT WILL ALWAYS BE SET WHEN YOU LOG IN');
 	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x-=170, y+=50, 75, 20, 1);
	CUSTOM_GUI.AddText(x, y, getColorStatus('assist'), '<h2>ASSIST</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 75);
	CUSTOM_GUI.AddTooltip('AUTO ASSIST<br>RE-ARM, TRAP BOX, POTIONS,<br>APPLE, AND PETALS<br> ');
	
 	CUSTOM_GUI.Update();
}
function railGUI() {
	Orion.Wait(100);
	var CUSTOM_GUI = Orion.CreateCustomGump(271104);
	
	CUSTOM_GUI.Clear();
	CUSTOM_GUI.SetNoClose(true);
	CUSTOM_GUI.SetCallback('onClick');
	
	const width = 10;
	const cellSize = 31;
	const height = 12;
	const color = 1188;
	const color2 = 1920;
	const color3 = 1106; 
	
	for (var y = 0; y < height; ++y) {
		for (var x = 0; x < width; ++x) {
			if (y == 0 && x == 0) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7748, color); // TL
				
			} else if (x == 0 && y == height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774E, color); //BL
				
			} else if (x == 0 && y > 0 && y < height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774B, color); // LC
				
			} else if (x == width-1 && y > 0 && y < height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774D, color); // RC
				
			} else if (y == height-1 && x == width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7750, color); // BR
				
			} else if (y == 0 && x == width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774A, color); // TR
				
			} else if (y == 0 && x > 0 && x < width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7749, color); // TC
				
			} else if (y == height-1 && x > 0 && x < width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774F, color); // BC
				
			} else {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774C, color2); // C
			}
		}
	}
	CUSTOM_GUI.AddLine(40, 51, 270, 51, 'white', 1); //Top
	CUSTOM_GUI.AddLine(40, 325, 270, 325, 'white', 1); //Bottom
	CUSTOM_GUI.AddLine(40, 40, 40, 325, 'white', 1); //Left
	CUSTOM_GUI.AddLine(270, 51, 270, 325, 'white', 1); //Right
	
	CUSTOM_GUI.AddGumpPic(-20, -18, 0x28A0, color3);
	CUSTOM_GUI.AddGumpPic(247, -18, 0x28AA, color3);
/*/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
/ / / / / / / / / / / / / /END OF BACKGROUND / / / / / / / / / / / / / / / / / / / /
 / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /*/
 	var serialNumber = 100;
 	//HEADER
	var guiWidth = width * cellSize;
	var text = '<h2>AUTO BOT</h2>';
	var averageCharWidth = 5;
	var centeredX = calculateCenteredX(guiWidth, text, averageCharWidth);
	CUSTOM_GUI.AddText(centeredX, 30, 1152, text);
 	
 	var x = 50;
 	var y = 50;
 	
 	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y, 70, 20, 1);
 	CUSTOM_GUI.AddText(getStatus('attack') ? x +5 : x, 52, getStatus('attack') ? '33' : '69', getStatus('attack') ? '<h2>STOP</h2>' : '<h2>START</h2>');
 	CUSTOM_GUI.AddText(x, 52, '0', ' ', 70);
	CUSTOM_GUI.AddTooltip('START / STOP');
	//TEXT ENTRY
	CUSTOM_GUI.AddLine(x-2, y+=25, x+60, y, 'white', 1); //Top
	CUSTOM_GUI.AddLine(x-2, y+20, x+60, y+20, 'white', 1); //Bottom
	CUSTOM_GUI.AddLine(x-2, y, x-2, y+20, 'white', 1); //Left
	CUSTOM_GUI.AddLine(x+60, y, x+60, y+20, 'white', 1); //Right
	CUSTOM_GUI.AddTextEntry(serialNumber++, x, y, '1152', Shared.GetVar('Wait Timer'), 60, 20, 6);
	CUSTOM_GUI.AddTooltip('Time to wait in milliseconds <br> Default 100ms (.1s)');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y+=25, 140, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>ABILITY LIST</h2>');
	CUSTOM_GUI.AddText(x, y, '23', ' ', 140);
	CUSTOM_GUI.AddTooltip('Spells and Abilities<br> Selection List<br>Click again to minimize ability list');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x, y+=25, 80, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>OPTIONS</h2>');
	CUSTOM_GUI.AddText(x, y, '23', ' ', 80);
	CUSTOM_GUI.AddTooltip('Miscellaneous Options');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=85, y+=-73, 120, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>RAIL MAKER</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 120);
	CUSTOM_GUI.AddTooltip('CREATE CUSTOM RAILS<br>AND SAVE THEM');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, 220, 135, 40, 20, 1);
	CUSTOM_GUI.AddText(220, 135, '23', '<h2>MIN</h2>');
	CUSTOM_GUI.AddText(220, 135, '23', ' ', 40);
	CUSTOM_GUI.AddTooltip('MINIMIZE');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=-5, y+=25, 130, 20, 1);
	CUSTOM_GUI.AddText(x, y, Shared.GetVar('Named Monsters Only') ? '33' : '69', '<h2>NAMED MOBS</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 130);
	CUSTOM_GUI.AddTooltip('ONLY SEARCHES FOR NAMED MONSTERS<br>NO OPTION TO ADD NAMES YET<br>HAVE TO GO INTO SCRIPTS MAUALLY');
	
 	CUSTOM_GUI.AddLine(70, 165, 240, 165, 'white', 2); //Bottom
 	
 	serialNumber = 1400
 	x = 50;
 	y = 175;
 	
	//TEXT ENTRY
	CUSTOM_GUI.AddLine(x-2, y, x+130, y, 'white', 1); //Top
	CUSTOM_GUI.AddLine(x-2, y+20, x+130, y+20, 'white', 1); //Bottom
	CUSTOM_GUI.AddLine(x-2, y, x-2, y+20, 'white', 1); //Left
	CUSTOM_GUI.AddLine(x+130, y, x+130, y+20, 'white', 1); //Right
	CUSTOM_GUI.AddHitBox(0, x, y, 90, 20);
	CUSTOM_GUI.AddTextEntry(serialNumber++, x, y, '1152', '', 130, 20, 16);
	CUSTOM_GUI.AddTooltip('ENTER NAME FOR THIS RAIL<br>NO NAME IF BLANK<br>MAX CHARACTERS 16');
 	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=135, y, 70, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>CREATE</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 70);
	CUSTOM_GUI.AddTooltip('CREATE CUSTOM RAIL<br>TYPE IN THE WHITE BOX TO MAKE A NAME');
 	//DROP DOWN SELECTION
	CUSTOM_GUI.AddComboBox(serialNumber++, x = 50, y+25, '0x1400', 0, '0x1400', 200, -2, 7);
	if (getRail()) {
		getRail().map(function(x){
			const selected = x.name === Shared.GetVar('Rail Name') ? 1 : 0;
			CUSTOM_GUI.AddComboBoxText(x.name, 69, selected);
		});
	}
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x=50, y+=50, 70, 20, 1);
	CUSTOM_GUI.AddText(x, y, getStatus('writeFile') ? '33' : '23', getStatus('writeFile') ? '<h2>END</h2>' : '<h2>WRITE</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 70);
	CUSTOM_GUI.AddTooltip('ADD ALL THE COORDS INTO THE CREATED RAIL<br>MAKE SURE TO HAVE IT SELECTED IN THE DROP DOWN<br>IF NO NAME IS SELECTED IT WILL NOT WORK');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x=210, y, 45, 20, 1);
	CUSTOM_GUI.AddText(x, y, getStatus('walkRail') ? '33' : '23', getStatus('walkRail') ? '<h2>STOP</h2>' : '<h2>RUN</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 45);
	CUSTOM_GUI.AddTooltip('RUN SELECTED RAIL<br>MAKE SURE TO HAVE IT SELECTED IN THE DROP DOWN<br>IF NO NAME IS SELECTED IT WILL NOT RUN');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x=50, y+=25, 135, 20, 1);
	CUSTOM_GUI.AddText(x, y, '23', '<h2>REMOVE RAIL</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 135);
	CUSTOM_GUI.AddTooltip('REMOVES A RAIL FROM THE LIST<br>MAKE SURE TO HAVE IT SELECTED IN THE DROP DOWN<br>IF NO NAME IS SELECTED IT WILL NOT REMOVE');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x=50, y+=50, 135, 20, 1);
	CUSTOM_GUI.AddText(x, y, '33', '<h2>DELETE FILE</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 135);
	CUSTOM_GUI.AddTooltip('DELETES ENTIRE FILE<br>ONLY CLICK IF YOU HAVE AN ERROR WITH YOUR RAIL FILE<br>WILL HAVE TO MAKE ALL YOUR RAILS AGAIN');
	
 	CUSTOM_GUI.Update();
}

function minGUI() {
	Orion.Wait(100);
	var update = true;
	Orion.SetTimer('TicToc', 10000);
	
	while (Shared.GetVar('selector') === 4) {
		Orion.Wait(100);
		var ticToc = Orion.Timer('TicToc');
		var CUSTOM_GUI = Orion.CreateCustomGump(271104);
		CUSTOM_GUI.SetCallback('onClick');	
		
		if (update) {
			CUSTOM_GUI.Clear();
			CUSTOM_GUI.SetNoClose(true);
		}
		
		if (Shared.GetVar('selector') !== 4) {
			break;
		}
		
		if (ticToc > 10000) {
			var image = getRandomArrayIndex();
			
			CUSTOM_GUI.AddGumpPic(0, 0, image, '0', 105);
			
			Orion.SetTimer('TicToc');
			
		}
		
		CUSTOM_GUI.Update();
		
		if (update) {
			update = false;
		}
	}
}
function responseGUI() {
	Orion.Wait(100);
	var CUSTOM_GUI = Orion.CreateCustomGump(191919);
	
	CUSTOM_GUI.Clear();
	CUSTOM_GUI.SetNoClose(true);
	CUSTOM_GUI.SetCallback('onClick');
	
	const width = 8;
	const cellSize = 31;
	const height = 3;
	const color = 1188;
	const color2 = 1920;
	const color3 = 1106; 
	
	for (var y = 0; y < height; ++y) {
		for (var x = 0; x < width; ++x) {
			if (y == 0 && x == 0) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7748, color); // TL
				
			} else if (x == 0 && y == height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774E, color); //BL
				
			} else if (x == 0 && y > 0 && y < height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774B, color); // LC
				
			} else if (x == width-1 && y > 0 && y < height-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774D, color); // RC
				
			} else if (y == height-1 && x == width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7750, color); // BR
				
			} else if (y == 0 && x == width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774A, color); // TR
				
			} else if (y == 0 && x > 0 && x < width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x7749, color); // TC
				
			} else if (y == height-1 && x > 0 && x < width-1) {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774F, color); // BC
				
			} else {
				CUSTOM_GUI.AddGumpPic(x * 31, y * 31, 0x774C, color2); // C
			}
		}
	}
	CUSTOM_GUI.AddLine(53, 35, 195, 35, 'white', 1); //Top
	CUSTOM_GUI.AddLine(53, 60, 195, 60, 'white', 1); //Bottom
	CUSTOM_GUI.AddLine(53, 35, 53, 60, 'white', 1); //Left
	CUSTOM_GUI.AddLine(195, 35, 195, 60, 'white', 1); //Right
	CUSTOM_GUI.AddLine(124, 35, 124, 60, 'white', 1); //Center
	
	
	CUSTOM_GUI.AddGumpPic(-20, -18, 0x28A0, color3, 0, '0', 80, 100);
	CUSTOM_GUI.AddGumpPic(185, -18, 0x28AA, color3, 0, '0', 80, 100);
/*/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
/ / / / / / / / / / / / / /END OF BACKGROUND / / / / / / / / / / / / / / / / / / / /
 / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /*/
	var serialNumber = 9000;
 	
 	var x = 0;
 	var y = 0;
 	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=55, y+=36, 60, 20, 1);
	CUSTOM_GUI.AddText(x, y, '69', '<h2>  YES</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 60);
	CUSTOM_GUI.AddTooltip('ACCEPT FILE DELETE');
	//BUTTON
	CUSTOM_GUI.AddHitBox(serialNumber++, x+=72, y, 60, 20, 1);
	CUSTOM_GUI.AddText(x, y, '33', '<h2>  NO</h2>');
	CUSTOM_GUI.AddText(x, y, '0', ' ', 60);
	CUSTOM_GUI.AddTooltip('DECLINE FILE DELETE');
	
 	CUSTOM_GUI.Update();
}
function onClick(){
	var buttonID = CustomGumpResponse.ReturnCode();
	var comboBox = CustomGumpResponse.ComboBox(1402);
	var lootTxtEntry = CustomGumpResponse.Text(1302);
	var waitTxtEntry = CustomGumpResponse.Text(101);
	var railTxtEntry = CustomGumpResponse.Text(1400);
	//Orion.Print(buttonID);
	//Orion.Print('box ' + comboBox);
	//Orion.Print('txt ' + railTxtEntry);
	if (waitTxtEntry !== ' ') {
		Shared.AddVar('Wait Timer', CustomGumpResponse.Text(101));
	}
	
	if (comboBox >= 0) {
		var rail = getRail();
		
		if (rail === undefined || rail === null) { return; }
		
		for ( var i = 0; i < rail.length; i++ ) {
			if (i === comboBox) {
				Shared.AddVar('Rail Name', rail[i].name);
			}
		}
	}
	
	switch(buttonID){
	// MAIN BUTTONS
		case 100:
			Orion.ToggleScript('attack', true);
			Orion.StopWalking();
			openGUI();
			break;
			
		case 102:
			if (Shared.GetVar('selector') === 1) {
				Shared.AddVar('selector', 0);
			} else {
				Shared.AddVar('selector', 1);
			}
			openGUI();
			break;
			
		case 103:
			if (Shared.GetVar('selector') === 2) {
				Shared.AddVar('selector', 0);
			} else {
				Shared.AddVar('selector', 2);
			}
			openGUI();
			break;
			
		case 104:
			if (Shared.GetVar('selector') === 3) {
				Shared.AddVar('selector', 0);
			} else {
				Shared.AddVar('selector', 3);
			}
			openGUI();
			break;
			
		case 105:
			if (Shared.GetVar('selector') === 4) {
				Shared.AddVar('selector', 0);
			} else {
				Shared.AddVar('selector', 4);
			}
			openGUI();
			break;
		case 106:
			if ( Shared.GetVar('Named Monsters Only') === false ) {
				Shared.AddVar('Named Monsters Only', true);
			} else {
				Shared.AddVar('Named Monsters Only', false);
			}
			openGUI();
			break;
	// ABILITY BUTTONS
		case 1200:
			Orion.ToggleScript('consecrateWeapon', true);
			openGUI();
			break;
		
		case 1201:
			Orion.ToggleScript('divineFury', true);
			openGUI();
			break;
		
		case 1202:
			Orion.ToggleScript('enemyOfOne', true);
			openGUI();
			break;
		
		case 1203:
			Orion.ToggleScript('confidence', true);
			openGUI();
			break;
		
		case 1204:
			Orion.ToggleScript('counterAttack', true);
			openGUI();
			break;
		
		case 1205:
			Orion.ToggleScript('evasion', true);
			openGUI();
			break;
		
		case 1206:
			Orion.Exec('specials', true);
			if ( Shared.GetVar('primary') !== true ) {
				Shared.AddVar('primary', true);
			} else {
				Shared.AddVar('primary', false );
			}
			openGUI();
			break;
		
		case 1207:
			Orion.Exec('specials', true);
			if ( Shared.GetVar('secondary') !== true ) {
				Shared.AddVar('secondary', true);
			} else {
				Shared.AddVar('secondary', false );
			}
			openGUI();
			break;
		
		case 1208:
			Orion.ToggleScript('momentumStrike', true);
			openGUI();
			break;
			
		case 1209:
			Orion.ToggleScript('bandage', true);
			openGUI();
			break;
		
		case 1210:
			Orion.ToggleScript('vampiricEmbrace', true);
			openGUI();
			break;
		case 1211:
			Orion.ToggleScript('lightningStrike', true);
			openGUI();
			break;
		case 1212:
			Orion.ToggleScript('wraithForm', true);
			openGUI();
			break;
		case 1213:
			Orion.ToggleScript('removeForm', true);
			openGUI();
			break;
	// OPTIONAL BUTTONS
		case 1300:
			Orion.ToggleScript('lootCorpse', true);
			openGUI();
			break;
		case 1301:
			Orion.ToggleScript('mount', true);
			openGUI();
			break;
		case 1303:
			if (waitTxtEntry !== ' ') {
				Shared.AddVar('Loot List', CustomGumpResponse.Text(1302));
				Orion.CharPrint(self, '0x09C2', 'Autoloot set to '+ Shared.GetVar('Loot List') + ' list.');
			} else {
				Orion.CharPrint(self, '0x09C2', 'You did not enter a list name.');
			}
			openGUI();
			break;
		case 1304:
			Orion.ToggleScript('assist', true);
			openGUI();
			break;
	// RAIL MAKER BUTTONS
		case 1401:
			if ( railTxtEntry !== '' ) {
				Shared.AddVar('Rail Name', railTxtEntry);
			}
			createFile();
			openGUI();
			break;
		
		case 1403:
			Orion.ToggleScript('writeFile', true);
			openGUI();
			break;
		
		case 1404:
			Orion.ToggleScript('walkRail', true);
			if ( Orion.ScriptRunning('attack') === 1 ) {
				Orion.ToggleScript('attack', true);
			} else if ( Orion.ScriptRunning('attack') === -1 ) {
				Orion.ResumeScript('attack');
			}
			Orion.StopWalking();
			openGUI();
			break;
			
		case 1405:
			if (comboBox === -1) { return; }
			removeRail();
			openGUI();
			break;
			
		case 1406:
			if ( Shared.GetVar('Yes No') !== true ) {
				Shared.AddVar('Yes No', true);
			}
			openGUI();
			break;
		// CONFIRMATION YES NO BUTTONS
		case 9000:
			deleteFile();
			var CUSTOM_GUI = Orion.CreateCustomGump(191919);
			CUSTOM_GUI.Close();
			openGUI();
			break;
		case 9001:
			var CUSTOM_GUI = Orion.CreateCustomGump(191919);
			CUSTOM_GUI.Close();
			openGUI();
			break;
	}
}
function openGUI() {
	selector = Shared.GetVar('selector');
	response = Shared.GetVar('Yes No');
	
	if (selector === 0) {
		mainGUI();
	
	} else if (selector === 1) {
		abilityGUI();
	
	} else if (selector === 2) {
		miscGUI();
	
	} else if (selector === 3) {
		railGUI();
		if ( response === true ) {
			responseGUI();
			Shared.AddVar('Yes No', false);
		}
		
	} else if (selector === 4) {
		Orion.Exec('minGUI', true);
	}
}
//--# ABILITY FUNCTIONS
function attack() {
	var namedMonsters = Shared.GetVar('Named Monsters');
	while (true) {
		Orion.Wait(Shared.GetVar('Wait Timer'));
		var mob = Shared.GetVar('Target', getTarget());
		const RANGE = Shared.GetVar('Weapon Range', getWeaponRange());
		
		if ( Orion.Timer('IgnoreReset') >= -1 ) {
     		Orion.IgnoreReset();
     		Orion.SetTimer('IgnoreReset', 1000 * 60 * -15 );
     	}
     	if ( Orion.Timer('ClearHighlights') >= -1 ) {
     		Orion.ClearHighlightCharacters();
     		Orion.SetTimer('ClearHighlights', 1000 * -5 );
     	}
		
		if (mob === null || mob === undefined) { continue; }
		
		if (mob.Exists() && mob.Distance() > RANGE) {
			Orion.WalkTo(mob.X(), mob.Y(), mob.Z(), RANGE, 255, 1, 1, 1000);
			Orion.Attack(mob.Serial());
		
		} else if (mob.Exists() && mob.Distance() <= RANGE) {
			if ( RANGE === 1 && ( mob.Z() < Player.Z() -14 || mob.Z() > Player.Z() +14 ) ) {
				//Orion.Print( mob.Name() +' Z-axis:'+ mob.Z() +' not within bounds of my Z-axis:'+ Player.Z() +', as such ignoring.');
				Orion.Ignore(mob.Serial());
				continue;
		
			} else if ( RANGE > 1 && !mob.InLOS() ) {
				Orion.WalkTo(mob.X(), mob.Y(), mob.Z(), 1, 255, 1, 1, 5000);
				Orion.Attack(mob.Serial());
				if ( !mob.InLOS() && !Orion.Contains(mob.Properties(), namedMonsters) ) {
					//Orion.Print( mob.Name() +' is at distance '+ mob.Distance() +' and line of sight is '+ mob.InLOS() +', therefore ignoring.');
					Orion.Ignore(mob.Serial());
					continue;
				}
			}
			Orion.Attack(mob.Serial());
			Orion.ClientLastTarget(mob.Serial());
			
		}
	}
}
/*		// for Chivalry
		var castingRecoveryResult = getFCR();
		var fasterCastCap = getFCChiv();
		var castTime = getSpellInfo('Heal') - (fasterCastCap * 250);
		Orion.Wait(fasterCastRecovery+castTime);
		// For Magery, Mysticism and Necromancy spells
		var castingRecoveryResult = getFCR();
		var fasterCastCap = getFC2();
		var castTime = getSpellInfo('Heal') - (fasterCastCap * 250);
		Orion.Wait(fasterCastRecovery+castTime);
		// For Bushido, Ninjitsu, Spellweaving spells and Bard Masteries
		var castingRecoveryResult = getFCR();
		var fasterCastCap = getFC4();
		var castTime = getSpellInfo('Heal') - (fasterCastCap * 250);
		Orion.Wait(fasterCastRecovery+castTime);
		
		Shared.AddVar('Named Monsters', 'Zombie|Skeleton|Neira|Piper|Rikktor|Semidar|Mephitis|Silvani|Serado|Ilhenir|Meraktus|Twaulo|Primeval|Abyssal|Turtle|Dark Father|Melisande|Travesty|Toothed|Shadowlord');
		var monstersNear = Orion.FindTypeEx('!0x00A4|!0x033D|!0x002F', any, ground, 'mobile|ignoreself|ignorefriends|inlos', Range, 'gray|criminal|orange|red');
		
function holdLongEnoughToShoot() {
    Orion.BlockMoving(true);
    Orion.Wait(950);
    Orion.BlockMoving(false);
}
*/
function consecrateWeapon() {
	while(true){
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		const RANGE = Shared.GetVar('Weapon Range', getWeaponRange());
		var targetSerial = Orion.ClientLastTarget();
		var target = Orion.FindObject(targetSerial);
		
		if ( target == null ) { continue; }
		if ( target.Distance()  > RANGE ) { continue; }
		if ( Player.TithingPoints() < 100 ) { continue; }
		if ( Orion.BuffTimeRemaining('Consecrate Weapon') > 500 ) { continue; }
		
		var fasterCastRecovery = getFCR();
		var fasterCastCap = getFCChiv();
		var castTime = getSpellInfo('ConsecrateWeapon') - (fasterCastCap * 250);
		
		if ( Orion.ObjAtLayer('LeftHand') != null && !Orion.ObjAtLayer('LeftHand').Properties().match(/(Fire|Cold|Poison|Energy)\s\w+\s\d{3}/g) && Orion.ObjAtLayer('LeftHand').Properties().match(/Two-handed/g) ) {
			Orion.Cast('Consecrate Weapon');
		} else if ( Orion.ObjAtLayer('RightHand') != null && !Orion.ObjAtLayer('RightHand').Properties().match(/(Fire|Cold|Poison|Energy)\s\w+\s\d{3}/g) && Orion.ObjAtLayer('RightHand').Properties().match(/One-handed/g) ) {
			Orion.Cast('Consecrate Weapon');
		}
		Orion.Wait(fasterCastRecovery+castTime);
	}
}
function divineFury() {
	while(true){
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		const RANGE = Shared.GetVar('Weapon Range', getWeaponRange());
		var targetSerial = Orion.ClientLastTarget();
		var target = Orion.FindObject(targetSerial);
		
		if ( target == null ) { continue; }
		if ( target.Distance()  > RANGE ) { continue; }
		if ( Player.TithingPoints() < 100 ) { continue; }
		if ( Orion.BuffExists('Divine Fury') ) { continue; }
		
		var fasterCastRecovery = getFCR();
		var fasterCastCap = getFCChiv();
		var castTime = getSpellInfo('DivineFury') - (fasterCastCap * 250);
		
		Orion.Cast('Divine Fury');
		Orion.Wait(fasterCastRecovery+castTime);
	}
}
function enemyOfOne() {
	const eooNotSet = 'damage to the creature you next attack';
	while(true){
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		const RANGE = Shared.GetVar('Weapon Range', getWeaponRange());
		var targetSerial = Orion.ClientLastTarget();
		var target = Orion.FindObject(targetSerial);
		
		if ( target == null ) { continue; }
		if ( target.Distance()  > RANGE ) { continue; }
		if ( Player.TithingPoints() < 100 ) { continue; }
		
		var eooDescription = Orion.BuffDescription('Enemy of One');
		var fasterCastRecovery = getFCR();
		var fasterCastCap = getFCChiv();
		var castTime = getSpellInfo('EnemyOfOne') - (fasterCastCap * 250);
		
		if(!Orion.BuffExists('Enemy of One') && Orion.Contains(target.Properties(), Shared.GetVar('Named Monsters'))){
			Orion.Cast('Enemy of One');
		} else if(Orion.BuffExists('Enemy of One') && !Orion.Contains(eooDescription, Shared.GetVar('Named Monsters')) && !Orion.Contains(eooDescription, eooNotSet)){
			Orion.Cast('Enemy of One');
		} else if(Orion.BuffExists('Enemy of One') && !Orion.Contains(target.Properties(), Shared.GetVar('Named Monsters'))){
			Orion.Cast('Enemy of One');
		}
		Orion.Wait(fasterCastRecovery+castTime);
	}
}
function confidence() {
	while(true){
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		if ( Orion.BuffTimeRemaining('Confidence') > 10000 ) { continue; }
		if ( Player.Hits() > Player.MaxHits() * .3 ) { continue; }
		
		var fasterCastRecovery = getFCR();
		var fasterCastCap = getFC4();
		var castTime = getSpellInfo('Confidence') - (fasterCastCap * 250);
		
		Orion.Cast('Confidence');
		Orion.Wait(fasterCastRecovery+castTime);
		
	}
}
function counterAttack() {
	while(true){
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		const RANGE = Shared.GetVar('Weapon Range', getWeaponRange());
		var targetSerial = Orion.ClientLastTarget();
		var target = Orion.FindObject(targetSerial);
		
		if ( target == null ) { continue; }
		if ( target.Distance()  > RANGE ) { continue; }
		if ( Orion.BuffExists('Counter Attack') ) { continue; }
		if ( Orion.BuffExists('Evasion') ) { continue; }
		if ( Orion.BuffTimeRemaining('Confidence') > 10000 ) { continue; }
		
		var fasterCastRecovery = getFCR();
		var fasterCastCap = getFC4();
		var castTime = getSpellInfo('CounterAttack') - (fasterCastCap * 250);
		
		Orion.Cast('Counter Attack');
		Orion.Wait(fasterCastRecovery+castTime);
	}
}
function evasion() {
	while(true){
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		const RANGE = Shared.GetVar('Weapon Range', getWeaponRange());
		var targetSerial = Orion.ClientLastTarget();
		var target = Orion.FindObject(targetSerial);
		var effectEchoFS = Orion.InJournal('graphic=0x3709', 'sys', '0', any, Orion.Now() - 500 );
		
		if ( target == null ) { continue; }
		if ( target.Distance()  > RANGE ) { continue; }
		if ( Orion.Timer('Evasion') < -1 ) { continue; }
		if ( Orion.BuffExists('Evasion') ) { continue; }
		if ( !Orion.BuffExists('Corpse Skin') && !Orion.BuffExists('Curse') ) { continue; }
		if ( effectEchoFS == null ) { continue; }
		if ( !Orion.Contains(effectEchoFS.Text(), Player.Serial()) ) { continue; }
		
		
		var fasterCastRecovery = getFCR();
		var fasterCastCap = getFC4();
		var castTime = getSpellInfo('Evasion') - (fasterCastCap * 250);
		
		Orion.Cast('Evasion');
		Orion.SetTimer('Evasion', -27000);
		Orion.Wait(fasterCastRecovery+castTime);
	}
}
function specials() {
	while( Shared.GetVar('primary') === true || Shared.GetVar('secondary') === true ) {
		Orion.Wait( Shared.GetVar('Wait Timer') );
		
		const RANGE = Shared.GetVar('Weapon Range', getWeaponRange());
		var targetSerial = Orion.ClientLastTarget();
		var target = Orion.FindObject(targetSerial);
		var weaponRH = Orion.ObjAtLayer('RightHand');
		var weaponLH = Orion.ObjAtLayer('LeftHand');
		
		if ( target == null ) { continue; }
		if ( target.Distance()  > RANGE ) { continue; }
		if ( Orion.SpellStatus('Momentum Strike') ) { continue; }
		if ( weaponLH == null && weaponRH == null ) { continue; }
		if ( weaponLH != null && !Orion.Contains(weaponLH.Properties(), 'Two-handed') || weaponRH != null && !Orion.Contains(weaponRH.Properties(), 'One-handed') ) {
			continue;
		}
		if ( Orion.AbilityStatus('Primary') || Orion.AbilityStatus('Secondary') || Orion.SpellStatus('Onslaught') || Orion.SpellStatus('Pierce') || Orion.SpellStatus('Stagger') ) {
			continue;
		}
		
		var monstersNear = Orion.FindTypeEx('!0x00A4|!0x033D|!0x002F', any, ground, 'mobile|ignoreself|ignorefriends|inlos', RANGE, 'gray|criminal|orange|red'); // ignore EV, collosus, Reapers
		var abilityNames;
		var manacost = calculateSpecialsLMC();
	 	var primary = Shared.GetVar('primary');
	 	var secondary = Shared.GetVar('secondary');
	 	
	 	if  ( primary && secondary ) {
	 		abilityNames = Orion.GetCurrentAbilityNames();
	 	} else if ( primary ) {
	 		abilityNames = Orion.GetCurrentAbilityNames()[0];
	 	} else if ( secondary ) {
	 		abilityNames = Orion.GetCurrentAbilityNames()[1];
	 	} else {
	 		continue;
	 	}
		if ( Orion.Contains(abilityNames, 'Lightning Arrow|Mystic Arc') ) {
			var aoe = getGroupedTargets();
		}
		if ( Orion.Timer('SpecialUsed') < 0 ) { manacost *= 2; }
		
		if ( monstersNear.length && Player.Mana() > manacost && Orion.Timer('masteryCooldown') < 5200 && Orion.Timer('feint') < 5200  && Orion.SkillValue('Tactics') >= 600 && ( Orion.SkillValue('Archery') >= 900 || Orion.SkillValue('Throwing') >= 900 || Orion.SkillValue('Swordsmanship') >= 900 || Orion.SkillValue('Fencing') >= 900 || Orion.SkillValue('Mace Fighting') >= 900 ) ) {
			switch ( monstersNear.length ) {
				case 1: // 1 Target
					if ( Orion.Contains(abilityNames, 'Lightning Arrow|Mystic Arc') && aoe === true ) {
						useAbility('Lightning Arrow|Mystic Arc');
						Orion.SetTimer('SpecialUsed', -3100);
					} else if ( Orion.Contains(abilityNames, 'Double Shot') && Orion.ObjAtLayer('Mount') && Orion.SkillValue('Bushido', 'base') >= 500 ) {
              			useAbility('Double Shot');
              			Orion.SetTimer('SpecialUsed', -3100);
              		} else if ( Orion.Contains(abilityNames, 'Armor Ignore|Double Strike|Nerve Strike|Armor Pierce') ) {
              			useAbility('Armor Ignore|Double Strike|Nerve Strike|Armor Pierce');
               			Orion.SetTimer('SpecialUsed', -3100);
               		}
              		break;
				case 2: // 2 Targets
					if ( Orion.Contains(abilityNames, 'Lightning Arrow|Mystic Arc') && aoe === true ) {
						useAbility('Lightning Arrow|Mystic Arc');
						Orion.SetTimer('SpecialUsed', -3100);
					} else if ( Orion.Contains(abilityNames, 'Whirlwind Attack|Frenzied Whirlwind Attack') ) {
						useAbility('Whirlwind Attack|Frenzied Whirlwind Attack');
						Orion.SetTimer('SpecialUsed', -3100);
					} else if ( Orion.Contains(abilityNames, 'Double Shot') && Orion.ObjAtLayer('Mount') && Orion.SkillValue('Bushido', 'base') >= 500 ) {
              			useAbility('Double Shot');
              			Orion.SetTimer('SpecialUsed', -3100);
              		} else if ( Orion.Contains(abilityNames, 'Armor Ignore|Double Strike|Nerve Strike|Armor Pierce') ) {
              			useAbility('Armor Ignore|Double Strike|Nerve Strike|Armor Pierce');
               			Orion.SetTimer('SpecialUsed', -3100);
               		}
              		break;
				default: // 3 or more Targets
					if ( Orion.Contains(abilityNames, 'Lightning Arrow|Mystic Arc') && aoe === true ) {
						useAbility('Lightning Arrow|Mystic Arc');
						Orion.SetTimer('SpecialUsed', -3100);
					} else if(Orion.Contains(abilityNames, 'Whirlwind Attack|Frenzied Whirlwind Attack') ) {
						useAbility('Whirlwind Attack|Frenzied Whirlwind Attack');
						Orion.SetTimer('SpecialUsed', -3100);
           			} else if ( Orion.Contains(abilityNames, 'Double Shot') && Orion.ObjAtLayer('Mount') && Orion.SkillValue('Bushido', 'base') >= 500 ) {
              			useAbility('Double Shot');
              			Orion.SetTimer('SpecialUsed', -3100);
              		} else if ( Orion.Contains(abilityNames, 'Armor Ignore|Double Strike|Nerve Strike|Armor Pierce') ) {
              			useAbility('Armor Ignore|Double Strike|Nerve Strike|Armor Pierce');
               			Orion.SetTimer('SpecialUsed', -3100);
               		}
               		break;
			}
		}
	}		
}
function momentumStrike() {
	while(true){
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		const RANGE = Shared.GetVar('Weapon Range', getWeaponRange());
		var monstersNear = Orion.FindTypeEx('!0x00A4|!0x033D|!0x002F', any, ground, 'mobile|ignoreself|ignorefriends|inlos', 1, 'gray|criminal|orange|red');
		var targetSerial = Orion.ClientLastTarget();
		var target = Orion.FindObject(targetSerial);
		
		if ( target == null ) { continue; }
		if ( target.Distance()  > RANGE ) { continue; }
		if ( monstersNear.length < 2 ) { continue; }
		if ( Orion.SpellStatus('Momentum Strike') ) { continue; }
	//	if ( Orion.SpellStatus('Lightning Strike') ) { continue; }
		if ( Orion.AbilityStatus('Primary') ) { continue; }
		if ( Orion.AbilityStatus('Secondary') ) { continue; }
		
		var fasterCastRecovery = getFCR();
		var fasterCastCap = getFC4();
		var castTime = getSpellInfo('MomentumStrike') - (fasterCastCap * 250);
		
		Orion.Cast('Momentum Strike');
		Orion.Wait(fasterCastRecovery+castTime);
	}
}
function bandage(){
	var noto;
	while (true) {
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		if ( Player.Notoriety() === 1 ) {
			noto = 'blue';
		} else if ( Player.Notoriety() === 2 ) {
			noto = 'green';
		} else if ( Player.Notoriety() === 3 ) {
			noto = 'gray';
		} else if ( Player.Notoriety() === 4 ) {
			noto = 'criminal';
		} else if ( Player.Notoriety() === 5 ) {
			noto = 'orange';
		} else {
			noto = 'red';
		}
		
		if ( Orion.BuffExists('healing skill') ) { continue; }
		
		var friends = Orion.FindTypeEx(any, any, ground, 'live|inlos', 2, noto);
		var friendList = Orion.GetFriendList();
		for ( var i = 0; i < friendList.length; i++ ) {
			var friendObject = Orion.FindObject(friendList[i]);	
			if(friendObject != null){
				if(friendObject.Distance() <= 2 && !friendObject.Dead()){	
					friends.push(friendObject);
				}
			}
		}
		friends.sort(function(f1, f2) { return f1.Hits('%') - f2.Hits('%') });
		if ( !Orion.Contains(friends[0].Properties(), '(tame)|(bonded)|(summoned)') ) {
			if ( ( friends[0].Hits('%') < 85 || friends[0].Poisoned() ) && !friends[0].YellowHits() ) {
				const FRIEND_TO_HEAL = friends[0].Serial();
				Orion.BandageTarget(FRIEND_TO_HEAL);
			}
		}
	}
}
function vampiricEmbrace() {
	Orion.Wait(100);
	getDress();
	while ( Orion.ScriptRunning('removeForm') === 0 ) {
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		if ( Orion.BuffExists('Vampiric Embrace') ) { continue; }
		
		for ( var i = 4; i <= 19; i+=3){
			var item = Orion.ObjAtLayer(i);
			if ( i === 16 ) { continue; }
			
			if(!item){
				Orion.Dress('Equipment');
				Orion.CharPrint(self, 0x09C2, 'Vamp Form Incoming, 16 seconds.');
				Orion.Wait(16000);
				break;
			}
		}
		var arcaneItem = Orion.FindTypeEx('0x26B0|0x26AF|0x26AE|0x26AD', '!0x0000')[0];
		var gloves = Orion.ObjAtLayer('Gloves');
		var cloak = Orion.ObjAtLayer('Cloak');
		var robe = Orion.ObjAtLayer('Robe');
		var shoes = Orion.ObjAtLayer('Shoes');
		
		if(gloves != null && gloves.Name() === 'Gloves Of The Holy Warrior' ) {
			Orion.Unequip('Gloves');
			Orion.Wait('moveitemdelay');
		}
		if(arcaneItem != null){
			var value = arcaneItem.Properties().match(/(Arcane Charges:)\s([1-9]\d*)\s\/\s\d+/g);
			if(Orion.Contains(arcaneItem.Properties(), value)){
				Orion.SetDressList('ArcaneItems', [arcaneItem.Serial()]);
				Orion.Dress('ArcaneItems');
			}
		}
		if(Player.Flying()){
			Orion.CreateClientMacro('ToggleGargoyleFlying').Play();
		}
		while ( !Orion.BuffExists('Vampiric Embrace') ) {
			if ( cloak != null && cloak.Name() === 'An Arcane Cloak' ) {
				if ( cloak.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, cloak.Name() +' charges are depleted');
					break;
				}
			}
			if ( gloves != null && gloves.Name() === 'Arcane Leather Gloves' ) {
				if ( gloves.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, gloves.Name() +' charges are depleted');
					break;
				}
			}
			if ( robe != null && robe.Name() === 'An Arcane Robe' ) {
				if ( robe.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, robe.Name() +' charges are depleted');
					break;
				}
			}
			if ( shoes != null && shoes.Name() === 'Arcane Thigh Boots' ) {
				if ( shoes.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, shoes.Name() +' charges are depleted');
					break;
				}
			}
			var fasterCastRecovery = getFCR();
			var fasterCastCap = getFC2();
			var castTime = getSpellInfo('VampiricEmbrace') - (fasterCastCap * 250);
			
			Orion.Cast('Vampiric Embrace');
			Orion.Wait(fasterCastRecovery+castTime);
		}
		Orion.Dress('Equipment');
	}
}
function lightningStrike() {
	while(true) {
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		const RANGE = Shared.GetVar('Weapon Range', getWeaponRange());
		var targetSerial = Orion.ClientLastTarget();
		var target = Orion.FindObject(targetSerial);
		
		if ( target == null ) { continue; }
		if ( target.Distance()  > RANGE ) { continue; }
		if ( Orion.SpellStatus('Lightning Strike') ) { continue; }
		if ( Orion.SpellStatus('Momentum Strike') ) { continue; }
		if ( Orion.AbilityStatus('Primary') ) { continue; }
		if ( Orion.AbilityStatus('Secondary') ) { continue; }
		
		var fasterCastRecovery = getFCR();
		var fasterCastCap = getFC4();
		var castTime = getSpellInfo('LightningStrike') - (fasterCastCap * 250);
		
		Orion.Cast('Lightning Strike');
		Orion.Wait(fasterCastRecovery+castTime);
	}
}
function wraithForm() {
	Orion.Wait(100);
	getDress();
	while ( Orion.ScriptRunning('removeForm') === 0 ) {
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		if ( Orion.BuffExists('Wraith Form') ) { continue; }
		
		for ( var i = 4; i <= 19; i+=3){
			var item = Orion.ObjAtLayer(i);
			if ( i === 16 ) { continue; }
			
			if(!item){
				Orion.Dress('Equipment');
				Orion.CharPrint(self, 0x09C2, 'Wraith Form Incoming, 16 seconds.');
				Orion.Wait(16000);
				break;
			}
		}
		var arcaneItem = Orion.FindTypeEx('0x26B0|0x26AF|0x26AE|0x26AD', '!0x0000')[0];
		var gloves = Orion.ObjAtLayer('Gloves');
		var cloak = Orion.ObjAtLayer('Cloak');
		var robe = Orion.ObjAtLayer('Robe');
		var shoes = Orion.ObjAtLayer('Shoes');
		
		if(gloves != null && gloves.Name() === 'Gloves Of The Holy Warrior' ) {
			Orion.Unequip('Gloves');
			Orion.Wait('moveitemdelay');
		}
		if(arcaneItem != null){
			var value = arcaneItem.Properties().match(/(Arcane Charges:)\s([1-9]\d*)\s\/\s\d+/g);
			if(Orion.Contains(arcaneItem.Properties(), value)){
				Orion.SetDressList('ArcaneItems', [arcaneItem.Serial()]);
				Orion.Dress('ArcaneItems');
			}
		}
		if(Player.Flying()){
			Orion.CreateClientMacro('ToggleGargoyleFlying').Play();
		}
		while ( !Orion.BuffExists('Wraith Form') ) {
			if ( cloak != null && cloak.Name() === 'An Arcane Cloak' ) {
				if ( cloak.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, cloak.Name() +' charges are depleted');
					break;
				}
			}
			if ( gloves != null && gloves.Name() === 'Arcane Leather Gloves' ) {
				if ( gloves.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, gloves.Name() +' charges are depleted');
					break;
				}
			}
			if ( robe != null && robe.Name() === 'An Arcane Robe' ) {
				if ( robe.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, robe.Name() +' charges are depleted');
					break;
				}
			}
			if ( shoes != null && shoes.Name() === 'Arcane Thigh Boots' ) {
				if ( shoes.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, shoes.Name() +' charges are depleted');
					break;
				}
			}
			var fasterCastRecovery = getFCR();
			var fasterCastCap = getFC2();
			var castTime = getSpellInfo('WraithForm') - (fasterCastCap * 250);
			
			Orion.Cast('Wraith Form');
			Orion.Wait(fasterCastRecovery+castTime);
		}
		Orion.Dress('Equipment');
	}
}
function removeForm() {
	Orion.Wait(100);
	getDress();
	while ( Orion.ScriptRunning('wraithForm') === 0 && Orion.ScriptRunning('vampiricEmbrace') === 0 ) {
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		if ( !Orion.BuffExists('Wraith Form') && !Orion.BuffExists('Vampiric Embrace')  && !Orion.BuffExists('Lich Form') &&
			!Orion.BuffExists('Horrific Beast') && !Orion.BuffExists('Stone Form') && !Orion.BuffExists('Vampiric Embrace') &&
			!Orion.BuffExists('Reaper Form') && !Orion.BuffExists('Polymorph') ) { continue; }
		
		for ( var i = 4; i <= 19; i+=3){
			var item = Orion.ObjAtLayer(i);
			if ( i === 16 ) { continue; }
			
			if(!item){
				Orion.Dress('Equipment');
				Orion.CharPrint(self, 0x09C2, 'Wraith Form Incoming, 16 seconds.');
				Orion.Wait(16000);
				break;
			}
		}
		var arcaneItem = Orion.FindTypeEx('0x26B0|0x26AF|0x26AE|0x26AD', '!0x0000')[0];
		var gloves = Orion.ObjAtLayer('Gloves');
		var cloak = Orion.ObjAtLayer('Cloak');
		var robe = Orion.ObjAtLayer('Robe');
		var shoes = Orion.ObjAtLayer('Shoes');
		
		if(gloves != null && gloves.Name() === 'Gloves Of The Holy Warrior' ) {
			Orion.Unequip('Gloves');
			Orion.Wait('moveitemdelay');
		}
		if(arcaneItem != null){
			var value = arcaneItem.Properties().match(/(Arcane Charges:)\s([1-9]\d*)\s\/\s\d+/g);
			if(Orion.Contains(arcaneItem.Properties(), value)){
				Orion.SetDressList('ArcaneItems', [arcaneItem.Serial()]);
				Orion.Dress('ArcaneItems');
			}
		}
		if(Player.Flying()){
			Orion.CreateClientMacro('ToggleGargoyleFlying').Play();
		}
		while ( Orion.BuffExists('Wraith Form') || Orion.BuffExists('Vampiric Embrace')  || Orion.BuffExists('Lich Form') ||
			Orion.BuffExists('Horrific Beast') || Orion.BuffExists('Stone Form') || Orion.BuffExists('Vampiric Embrace') ||
			Orion.BuffExists('Reaper Form') || Orion.BuffExists('Polymorph') ) {
			
			if ( cloak != null && cloak.Name() === 'An Arcane Cloak' ) {
				if ( cloak.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, cloak.Name() +' charges are depleted');
					break;
				}
			}
			if ( gloves != null && gloves.Name() === 'Arcane Leather Gloves' ) {
				if ( gloves.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, gloves.Name() +' charges are depleted');
					break;
				}
			}
			if ( robe != null && robe.Name() === 'An Arcane Robe' ) {
				if ( robe.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, robe.Name() +' charges are depleted');
					break;
				}
			}
			if ( shoes != null && shoes.Name() === 'Arcane Thigh Boots' ) {
				if ( shoes.Properties().match(/(Arcane Charges:)\s[0]\s\/\s\d+/g) ) {
					Orion.CharPrint(self, 0x09C2, shoes.Name() +' charges are depleted');
					break;
				}
			}
			var spell;
			if ( Orion.BuffExists('Wraith Form') ) { var spell = ['Wraith Form', 'WraithForm']; } else
			if ( Orion.BuffExists('Vampiric Embrace') ) { var spell = ['Vampiric Embrace', 'VampiricEmbrace']; } else
			if ( Orion.BuffExists('Lich Form') ) { var spell = ['Lich Form', 'LichForm']; } else
			if ( Orion.BuffExists('Horrific Beast') ) { var spell = ['Horrific Beast', 'HorrificBeast']; } else
			if ( Orion.BuffExists('Stone Form') ) { var spell = ['Stone Form', 'StoneForm']; } else
			if ( Orion.BuffExists('Reaper Form') ) { var spell = ['Reaper Form', 'ReaperForm']; } else
			if ( Orion.BuffExists('Polymorph') ) { var spell = ['Polymoprh', 'Polymoprh']; }
			
			var fasterCastRecovery = getFCR();
			var fasterCastCap = getFC2();
			var castTime = getSpellInfo(spell[1]) - (fasterCastCap * 250);
			
			Orion.Cast(spell[0]);
			Orion.Wait(fasterCastRecovery+castTime);
		}
		Orion.Dress('Equipment');
	}
}
//--# RAIL FUNCTIONS
function createFile() {
	var filePath = Orion.CurrentScriptDirPath() + '/rails';
	var file = Orion.NewFile();
	var rail = [{
		name: Shared.GetVar('Rail Name'),
		coords: []
	}];
	var info = false;
	
	try {
		file.Open(filePath);
		var fileReadStr = file.ReadAll();
	
		if (fileReadStr !== '') {
			rail = JSON.parse(fileReadStr);
			var info = true;
		}
	
	} catch (err) {
		return Orion.Print(err);
	
	} finally {
		file.Close();
	}
	
	file.Open(filePath);
	
	if (info) {
		rail.push({ "name": Shared.GetVar('Rail Name'), "coords": [] });
	}
	var railStr = JSON.stringify(rail, null, 2);
	file.Write(railStr);
	file.Close();
}

function writeFile() {
	var filePath = Orion.CurrentScriptDirPath() + '/rails';
	var file = Orion.NewFile();
	var rail = [{
		name: Shared.GetVar('Rail Name'),
		coords: []
	}];
	var railStr = JSON.stringify(rail);
	
	try {
		file.Open(filePath);
		var fileReadStr = file.ReadAll();
		rail = JSON.parse(fileReadStr);
		
	} catch (err) {
		return Orion.Print(err);
	
	} finally {
		file.Close();
	}
	
	file.Open(filePath);
	
	var lastX = Player.X();
	var lastY = Player.Y();
	var stepsMoved = 0;
	var stepsBeforeLogging = Shared.GetVar('Steps Before Record');
	
	while (true) {
		var newX = Player.X();
		var newY = Player.Y();
		
		if (newX !== lastX || newY !== lastY) {
			var deltaX = Math.abs(newX - lastX);
			var deltaY = Math.abs(newY - lastY);
			stepsMoved += Math.max(deltaX, deltaY);
			lastX = newX;
			lastY = newY;
			
			if (stepsMoved >= stepsBeforeLogging) {
				for (var i = 0; i < rail.length; i++) {
					if (rail[i].name === Shared.GetVar('Rail Name')) {
						var railPoint = [newX, newY];
						var lastIndex = rail[i].coords.length > 0 ? rail[i].coords[rail[i].coords.length -1].index : -1;
						railPoint.index = lastIndex + 1;
						
						Orion.Print("Recording Rail Coordinates: " + JSON.stringify(railPoint));
						
						rail[i].coords.push(railPoint);
						file.Open(filePath);
						file.Write(JSON.stringify(rail, null, 2));
						file.Close();
						
						stepsMoved = 0;
					}
				}
			}
		}
		Orion.Wait(50);
	}
}
function walkRail() {
	var rail = getRail();
	
	if (rail === [] || rail === undefined || rail === null) { return; }
	
	for ( var i = 0; i < rail.length; i++ ) {
		if (rail[i].name === Shared.GetVar('Rail Name')) {
			rail = rail[i].coords;
		}
	}
	Orion.Exec('attack', true);
	while (!Player.Dead()) {
		Orion.Wait(100);
		if ( Orion.IsWalking() ) { continue; }
		if (rail[0] === [] || rail[0] === undefined || rail[0] === null) { return; }
		const x = rail[0][0];
		const y = rail[0][1];
		var xMaxValue = x + 72;
		var xMinValue = x - 72;
		var yMaxValue = y + 72;
		var yMinValue = y - 72;
		var xOutOfRange = Player.X() > xMaxValue || Player.X() < xMinValue;
		var yOutOfRange = Player.Y() > yMaxValue || Player.Y() < yMinValue;
		var mob = Shared.GetVar('Target', getTarget());

		if ( xOutOfRange || yOutOfRange ) {
			if ( Orion.ScriptRunning('attack') === 1 ) {
				Orion.PauseScript('attack');
				Orion.StopWalking();
			}
		} else if ( !xOutOfRange && !yOutOfRange && mob ) {
			if ( Orion.ScriptRunning('attack') === -1 ) {
				Orion.ResumeScript('attack');
			}
			continue;
		}
		Orion.WalkTo(x, y, Player.Z(), 0, 255, 1, 1, 10000);
	
		if (Player.X() === rail[0][0] && Player.Y() === rail [0][1]) {
			rail.push(rail[0]);
			rail.shift(rail);
		}
	}
}
function removeRail() {
	var filePath = Orion.CurrentScriptDirPath() + '/rails';
	var file = Orion.NewFile();
	var rail = [];
	
	try {
		file.Open(filePath);
		var fileReadStr = file.ReadAll();
		
		if (fileReadStr !== '') {
			rail = JSON.parse(fileReadStr);
		}
		
	} catch (error) {
		Orion.Print(error);
		
	} finally {
		file.Close();
	}
	
	for (var i = 0; i < rail.length; i++) {
		if (rail[i].name === Shared.GetVar('Rail Name')) {
			rail.splice(i, 1);
		}
	}
	
	railStr = JSON.stringify(rail, null, 2);
	file.Remove(filePath);
	
	var filePath = Orion.CurrentScriptDirPath() + '/rails';
	var file = Orion.NewFile();
	rail = [];
	
	try {
		file.Open(filePath);
		var fileReadStr = file.ReadAll();
		
		if (fileReadStr !== '') {
			rail = JSON.parse(fileReadStr);
		}
		
	} catch (error) {
		Orion.Print(error);
		
	} finally {
		file.Close();
	}
	
	file.Open(filePath);
	file.Write(railStr);
	file.Close();
}
function deleteFile() {
	var filePath = Orion.CurrentScriptDirPath() + '/rails';
	var file = Orion.NewFile();
	/*
	try {
		file.Open(filePath);
		
	} catch (error) {
		Orion.Print(error);
		
	} finally {
		file.Close();
	}
	*/
	file.Remove(filePath);
}
//--# REPAIR FUNCTIONS
function durability() {
	while(true) {
		Orion.Wait(10000);
		if ( Orion.Timer('CheckDurability') >= -1 ) {
			const ITEMS = getDurability();
			
			if ( ITEMS.length ) {
				Orion.CharPrint('self', 'any', 'Need To Repair!');
				const REPAIR_BENCH = Orion.FindTypeEx('0xA278|0xA277|0xA27F|0xA27E', any, ground, 'near', 24);
				
				if ( REPAIR_BENCH.length ) {
					if ( Orion.ScriptRunning('attack') || Orion.ScriptRunning('walkRail') ) {
						Orion.PauseScript('attack');
						Orion.PauseScript('walkRail');
					}
					if ( Player.WarMode() ) {
						Orion.WarMode();
					}
					if ( REPAIR_BENCH[0].Distance() > 2 ) {
						Orion.StopWalking();
						Orion.WalkTo(REPAIR_BENCH[0].X(), REPAIR_BENCH[0].Y(), REPAIR_BENCH[0].Z(), 1, 255, 1, 1, 10000);
					}
					useRepairBench();
					Orion.SetTimer('CheckDurability', 1000 * 60 * -1);
					
				} else {
					Orion.CharPrint(self, any, 'No repair Bench Found');
					Orion.SetTimer('CheckDurability', 1000 * 60 * -1);
				}
			}
		}
	}
}
function useRepairBench() {
	var items = getDurability();
	const REPAIR_BENCH = Orion.FindTypeEx('0xA278|0xA277|0xA27F|0xA27E', any, ground, '', 2)[0];
	
	if (!REPAIR_BENCH) { return null; }
	
	if (Orion.HaveTarget()) { Orion.CancelTarget(); }
	
	Orion.CancelWaitGump();
	Orion.UseObject(REPAIR_BENCH.Serial());
	
	items.forEach(function (item) {
		repairBenchGump = getGump();
		
		Orion.WaitGump(Orion.CreateGumpHook(2002)); //BS
		Orion.WaitGump(Orion.CreateGumpHook(2003)); //CARP
		Orion.WaitGump(Orion.CreateGumpHook(2006)); //TAILOR
		Orion.WaitGump(Orion.CreateGumpHook(2010)); //MASON
		Orion.WaitGump(Orion.CreateGumpHook(2011)); //GLASS
		Orion.WaitGump(Orion.CreateGumpHook(2009)); //FLETCH
		repairBenchGump.Select(Orion.CreateGumpHook(2001)); //TINK
		
		for (index = 0, count = 7; index <= count; index++) {
			Orion.WaitForTarget();
			Orion.TargetObject(item);
		} // add in journal item repaired to stop it early
	}); // if it used say BS and succeeded or failed
	
	if (items.length) {
		Orion.Print('items that failed to repair: ' + items.length);
		useRepairBench();
		
	} else {
		Orion.WaitForGump(1000, true);
		var repairBenchGump = getGump();
		repairBenchGump.Close();
		if ( Orion.ScriptRunning('attack') === -1 || Orion.ScriptRunning('walkRail') === -1 ) {
			Orion.ResumeScript('attack');
			Orion.ResumeScript('walkRail');
		}
		Orion.Print('Done.');
	}
}
//--# OPTIONAL FUNCTIONS
function lootCorpse() {
	while ( true ) {
		Orion.Wait(Shared.GetVar('Wait Timer'));
		const CORPSES = Orion.FindTypeEx('0x2006', any, ground, '', 11);
		var lewt = Shared.GetVar('Loot List');
		
		if ( lewt == null ) {
			Orion.CharPrint(self, '0x09C2', 'Loot list not set!');
			Orion.Wait(5000);
			continue;
		}
		if ( CORPSES.length ) {
			Orion.StopWalking();
			if ( Orion.ScriptRunning('attack') || Orion.ScriptRunning('walkRail') ) {
				Orion.PauseScript('attack');
				Orion.PauseScript('walkRail');
			}
			CORPSES.forEach(function (corpse) {
				if (Player.Weight() < Player.MaxWeight() * .9) {
					if (corpse.Distance() > 2) {
						Orion.WalkTo(corpse.X(), corpse.Y(), corpse.Z(), 1, 255, 1, 1, 10000);
					}
					
					Orion.UseObject(corpse.Serial());
					Orion.Wait('useitemdelay');
					var lxwt = Orion.MoveItemList(lewt, corpse.Serial(), 0, backpack);
					
					while (lxwt) {
						lxwt = Orion.MoveItemList(lewt, corpse.Serial(), 0, backpack);
						Orion.Wait('moveitemdelay');
						
						if (Orion.InJournal('too far', 'sys', '0', 'any', Orion.Now() - 1500)) {
							break;
						}
					}
				}
				Orion.Ignore(corpse.Serial());
			});
			if ( Orion.ScriptRunning('attack') === -1 || Orion.ScriptRunning('walkRail') === -1 ) {
				Orion.ResumeScript('attack');
				Orion.ResumeScript('walkRail');
			}
		}
	}
}
function mount(){ // find way to tell if mount is mountable??
	while ( true ) {
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		var mount = Orion.FindTypeEx('!0x00A5', any, ground, 'canchangename|live|nothuman', 1);
		var mounts = Orion.FindTypeEx('!0x00A5', any, ground, 'canchangename|live|nothuman', 20);
		var ethy = Orion.FindTypeEx(any, any, backpack);
		var monstersNear8Mount = Orion.FindTypeEx('!0x00A4|!0x033D|!0x002F|!0x2006', any, ground, 'mobile|ignoreself|ignorefriends|inlos', 8, 'gray|criminal|orange|red');
	
		if(Player.Graphic() !== 0x029A && Player.Graphic() !== 0x029B && !Player.Frozen()){
			if ( Player.Followers() > 0 && mounts.length ) {	
				for ( var i = 0; i < mounts.length; i++ ) {
					if ( mounts[i].Distance() > 2 && !Orion.ObjAtLayer('Mount') && Orion.Timer('AFM') >= -1 ) {
						Orion.Say('All Follow Me');
						Orion.SetTimer('AFM', -10000);
					}
				}
			}
			if(Player.Followers() > 0 && mount.length){
				for(var mt = 0; mt < mount.length; mt++){
					if(!mount[mt].Poisoned()){
						Orion.UseObject(mount[mt].Serial());
					}
				}
			} else if(monstersNear8Mount = null || !monstersNear8Mount.length){
				if(ethy.length){
					for(var e = 0; e < ethy.length; e++){
						if(Orion.Contains(ethy[e].Properties(), 'ethereal|statuette')){
							Orion.UseObject(ethy[e].Serial());
						}
					}
				}
			}
		} else if(!Player.Flying() && !Player.Frozen() && (Player.Graphic() == 0x029A || Player.Graphic() == 0x029B) && (monstersNear8Mount = null || !monstersNear8Mount.length)){
			Orion.CreateClientMacro('ToggleGargoyleFlying').Play();
		}
	}
}
function assist() {
	var noWepToggle = true;
	if(!Orion.ObjAtLayer('RightHand')){
		noWepToggle = false;
	}
	while ( true ) {
		Orion.Wait(Shared.GetVar('Wait Timer'));
		
		if ( Orion.BuffExists('Invisibility') || !Orion.BuffExists('Hiding') ) { continue; }
		if ( Orion.DisplayTimerExists('action') ) { continue; }
		
		var monstersNear = Orion.FindTypeEx('!0x00A4|!0x033D|!0x002F', any, ground, 'mobile|ignoreself|ignorefriends|inlos', 1, 'gray|criminal|orange|red');
		var targetSerial = Orion.ClientLastTarget();
		var target = Orion.FindObject(targetSerial);
		var box = Orion.FindType('0x09A9', any, backpack);
		
		if ( target == null ) { continue; }
		if ( target.Distance() > 11 ) { continue; }
		if ( !monstersNear.length ) { continue; }
		
		if((Orion.ObjAtLayer('RightHand') || Orion.ObjAtLayer('LeftHand') && Orion.Contains(Orion.ObjAtLayer('LeftHand').Properties(), 'Two-handed')) && noWepToggle === false){
			noWepToggle = true;
		}
		if((!Orion.ObjAtLayer('LeftHand') && !Orion.ObjAtLayer('RightHand')) || (!Orion.ObjAtLayer('RightHand') && !Orion.Contains(Orion.ObjAtLayer('LeftHand').Properties(), 'Two-handed')) && noWepToggle === true){
			if(!Orion.BuffExists('Disarm') && !Player.Frozen()){
				Orion.CreateClientMacro('EquipLastWeapon').Play();
				Orion.AddDisplayTimer('action', 1450, 'AboveChar', 'line|bar', 'Wep', 0, 0, '0x09C2', 1, '0xFFFFFFFF');
				Orion.DisplayTimerSetSize('action', 20, 0);
				Orion.DisplayTimerSetShowTime('action', false);
			}
			
		} else if(Orion.Count('0x2FD8', '0x0488') && Orion.Timer('appleCooldown') >= -1 && (Orion.BuffExists('Blood Oath') || Orion.BuffExists('Curse') || Orion.BuffExists('Corpse Skin'))){
         	Orion.UseType('0x2FD8', '0x0488');
         	Orion.Wait(100);
     		var journalMessage = Orion.InJournal('A tasty bite','sys|my','0',any,Orion.Now()-1450, Orion.Now());
     		Orion.Print('The journal message is ' + journalMessage);
         	if (journalMessage !== null) {
            	Orion.SetTimer('appleCooldown', -30000);
            	Orion.ClearJournal('A tasty bite','sys|my');
            }
         	Orion.AddDisplayTimer('action', 1450, 'AboveChar', 'line|bar', 'Apple', 0, 0, '0x09C2', 1, '0xFFFFFFFF');
			Orion.DisplayTimerSetSize('action', 20, 0);
			Orion.DisplayTimerSetShowTime('action', false);
			
     	} else if(Player.Hits('%') < 55 && !Player.Poisoned() && !Player.YellowHits() && Orion.Timer('healPotCooldown') >= -1 && Orion.Count('0x0F0C','0x0000')){
     		Orion.UseType('0x0F0C');
     		Orion.SetTimer('healPotCooldown', -10050);
     		Orion.AddDisplayTimer('action', 1450, 'AboveChar', 'line|bar', 'Heal', 0, 0, '0x09C2', 1, '0xFFFFFFFF');
     		Orion.DisplayTimerSetSize('action', 20, 0);
     		Orion.DisplayTimerSetShowTime('action', false);
     		
     	} else if(box.length && !Orion.DisplayTimerExists('action') && (Orion.BuffExists('Evil Omen') || Orion.BuffExists('Paralyzed') || Orion.BuffExists('Paralyze') || Orion.InJournal('crippling nerve strike','sys',any, any, Orion.Now() - 1500, Orion.Now()))){
			Orion.ClearJournal('crippling nerve strike','sys');
			Orion.Wait(750);
			Orion.UseObject(box);
			Orion.WaitForContainerGump();
			Orion.CloseGump('container', Orion.GetSerial(box));
			Orion.AddDisplayTimer('action', 1450, 'AboveChar', 'line|bar', 'Box', 0, 0, any, -1, '0xFFB0B0FE');
			Orion.DisplayTimerSetSize('action', 20, 0);
			Orion.DisplayTimerSetShowTime('action', false);
			
		} else if(Player.Poisoned() && !Player.YellowHits() && Orion.Count('0x0F07','0x0000')){
     		Orion.UseType('0x0F07');
     		Orion.AddDisplayTimer('action', 1450, 'AboveChar', 'line|bar', 'Cure', 0, 0, '0x09C2', 1, '0xFFFFFFFF');
     		Orion.DisplayTimerSetSize('action', 20, 0);
     		Orion.DisplayTimerSetShowTime('action', false);
     		
     	} else if(Player.Stam('%') < 80 && Orion.Count('0x0F0B','0x0000')){
        	Orion.UseType('0x0F0B');
         	Orion.AddDisplayTimer('action', 1450, 'AboveChar', 'line|bar', 'Refresh', 0, 0, '0x09C2', 1, '0xFFFFFFFF');
			Orion.DisplayTimerSetSize('action', 20, 0);
			Orion.DisplayTimerSetShowTime('action', false);
			
     	} else if(!Orion.BuffExists('Strength') && Orion.Count('0x0F09', '0x0000')){
         	Orion.UseType('0x0F09','0x0000');
         	Orion.AddDisplayTimer('action', 1450, 'AboveChar', 'line|bar', 'Strength', 0, 0, '0x09C2', 1, '0xFFFFFFFF');
			Orion.DisplayTimerSetSize('action', 20, 0);
			Orion.DisplayTimerSetShowTime('action', false);
			
     	} else if(!Orion.BuffExists('Agility') && Orion.Count('0x0F08','0x0000')){
        	Orion.UseType('0x0F08');
         	Orion.AddDisplayTimer('action', 1450, 'AboveChar', 'line|bar', 'Agility', 0, 0, '0x09C2', 1, '0xFFFFFFFF');
			Orion.DisplayTimerSetSize('action', 20, 0);
			Orion.DisplayTimerSetShowTime('action', false);
			
     	} else if(!Orion.BuffExists('orange petals') && Orion.Count('0x1021', '0x002B') && Orion.Timer('orangePetalCooldown') >= -1){
         	Orion.UseType('0x1021', '0x002B');
         	Orion.SetTimer('orangePetalCooldown',-300000);
         	Orion.AddDisplayTimer('action', 1450, 'AboveChar', 'line|bar', 'Orange Petal', 0, 0, '0x09C2', 1, '0xFFFFFFFF');
			Orion.DisplayTimerSetSize('action', 20, 0);
			Orion.DisplayTimerSetShowTime('action', false);
			
     	} else if(!Orion.BuffExists('rose of trinsic petals') && Orion.Count('0x1021', '0x000E') && Orion.Timer('purplePetalCooldown') >= -1){
         	Orion.UseType('0x1021', '0x000E');
         	Orion.SetTimer('purplePetalCooldown',-300000);
         	Orion.AddDisplayTimer('action', 1450, 'AboveChar', 'line|bar', 'Purple Petal', 0, 0, '0x09C2', 1, '0xFFFFFFFF');
			Orion.DisplayTimerSetSize('action', 20, 0);
			Orion.DisplayTimerSetShowTime('action', false);
     	}
    }
}
//--# MODULE FUNCTIONS
function getStatus(scriptName) {
	const scriptRunning = Orion.ScriptRunning(scriptName) > 0;
	return scriptRunning;
}
function getColorStatus(scriptName) {
	const scriptRunning = Orion.ScriptRunning(scriptName) > 0;
	return scriptRunning ? 69 : 33;
}
function getRail() {
	var filePath = Orion.CurrentScriptDirPath() + '/rails';
	var file = Orion.NewFile();
	var rail;
	
	try {
		file.Open(filePath);
		var fileReadStr = file.ReadAll();
		
		if (fileReadStr !== '') {
			rail = JSON.parse(fileReadStr);
		}
		if (rail === null || rail === undefined) { return; }
		
	} catch (error) {
		Orion.Print(error);
		
	} finally {
		file.Close();
	}
	return rail;
}
function getRandomArrayIndex() {
	var img = ['0x7725', '0x7726', '0x7727', '0x7728', '0x7729', '0x772A', '0x772B', '0x772C', '0x772D', '0x772E',
					'0x611', '0x7767', '0x7768', '0x7769', '0x776A', '0x776B', '0x776C', '0x776D', '0x776E', '0x776F',
					'0x7770', '0x7771', '0x7772', '0x7773', '0x7774', '0x7775', '0x7776', '0X9BE0', '0X9BE1', '0X9BE2',
					'0X9BE3', '0X9BE4' ,'0X9BE5', '0X9BE6', '0X9BE7', '0X9BE8', '0X9BE9', '0X9BEA', '0x9CCE', '0x9CCF',
					'0x9CD5', '0x9CD6', '0X9D5B', '0X9D5E'];
	var num = Math.floor(Math.random() * img.length);
	return img[num];
}
function getSpecialAbilities() {
const ABILITIES = {
	'Armor Ignore': {name: 'Armor Ignore', graphic: '0x5200', manacost: 30},
	'Armor Pierce': {name: 'Armor Pierce', graphic: '0x5216', manacost: 30},
	'Bladeweave': {name: 'Bladeweave', graphic: '0x5217', manacost: 15},
	'Bleed Attack': {name: 'Bleed Attack', graphic: '0x5201', manacost: 30},
	'Block': {name: 'Block', graphic: '0x520F', manacost: 20},
	'Crushing Blow': {name: 'Crushing Blow', graphic: '0x5203', manacost: 20},
	'Concussion Blow': {name: 'Concussion Blow', graphic: '0x5202', manacost: 20},
	'Defense Mastery': {name: 'Defense Mastery', graphic: '0x5210', manacost: 20},
	'Disarm': {name: 'Disarm', graphic: '0x5204', manacost: 20},
	'Dismount': {name: 'Dismount', graphic: '0x5205', manacost: 25},
	'Double Shot': {name: 'Double Shot', graphic: '0x5215', manacost: 30},
	'Double Strike': {name: 'Double Strike', graphic: '0x5206', manacost: 30},
	'Dual Wield': {name: 'Dual Wield', graphic: '0x5214', manacost: 20},
	'Feint': {name: 'Feint', graphic: '0x5213', manacost: 30},
	'Force Arrow': {name: 'Force Arrow', graphic: '0x5218', manacost: 20},
	'Force of Nature': {name: 'Force of Nature', graphic: '0x521C', manacost: 35},
	'Frenzied Whirlwind': {name: 'Frenzied Whirlwind', graphic: '0x520E', manacost: 20},
	'Infectious Strike': {name: 'Infectious Strike', graphic: '0x5207', manacost: 20},
	'Infused Throw': {name: 'Infused Throw', graphic: '0x521D', manacost: 25},
	'Lightning Arrow': {name: 'Lightning Arrow', graphic: '0x5219', manacost: 15},
	'Mortal Strike': {name: 'Mortal Strike', graphic: '0x5208', manacost: 30},
	'Moving Shot': {name: 'Moving Shot', graphic: '0x5209', manacost: 20},
	'Mystic Arc': {name: 'Mystic Arc', graphic: '0x521E', manacost: 20},
	'Nerve Strike': {name: 'Nerve Strike', graphic: '0x5211', manacost: 30},
	'Paralyzing Blow': {name: 'Paralyzing Blow', graphic: '0x520A', manacost: 30},
	'Psychic Attack': {name: 'Psychic Attack', graphic: '0x521A', manacost: 25},
	'Riding Swipe': {name: 'Riding Swipe', graphic: '0x520D', manacost: 25},
	'Serpent Arrow': {name: 'Serpent Arrow', graphic: '0x521B', manacost: 25},
	'Shadow Strike': {name: 'Shadow Strike', graphic: '0x520B', manacost: 20},
	'Talon Strike': {name: 'Talon Strike', graphic: '0x5212', manacost: 20},
	'Whirlwind Attack': {name: 'Whirlwind Attack', graphic: '0x520C', manacost: 15}
};
var PRIMARY = [];
var SECONDARY = [];
var PRIMARY_MANACOST = [];
var SECONDARY_MANACOST = [];
	for (var ability in ABILITIES) {
		if (Orion.GetCurrentAbilityNames()[0] === ability) {
			var obj = ABILITIES[ability];
			for (var keys in obj) {
				if (keys === 'graphic') {
					PRIMARY.push(obj[keys]);
				}
				if (keys === 'manacost') {
					PRIMARY_MANACOST.push(obj[keys]);
				}
			}
		}
		if (Orion.GetCurrentAbilityNames()[1] === ability) {
			var obj = ABILITIES[ability];
			for (var keys in obj) {
				if (keys === 'graphic') {
					SECONDARY.push(obj[keys]);
				}
				if (keys === 'manacost') {
					SECONDARY_MANACOST.push(obj[keys]);
				}
			}
		}
	}
	const SPECIALS = [PRIMARY, SECONDARY, PRIMARY_MANACOST, SECONDARY_MANACOST];
	return SPECIALS;
}
function useAbility(name){
    const abilities = Orion.GetCurrentAbilityNames();
    const primary = Orion.AbilityStatus('Primary');
    const secondary = Orion.AbilityStatus('Secondary');
    const regex = new RegExp(name, 'i');

    if(abilities[0].match(regex) && !Orion.AbilityStatus('Primary') && !Orion.AbilityStatus('Secondary') && !Orion.SpellStatus('Onslaught') && !Orion.SpellStatus('Pierce') && !Orion.SpellStatus('Stagger')){
        Orion.UseAbility('Primary', true);
        Orion.Wait(50);
    } else if(abilities[1].match(regex) && !Orion.AbilityStatus('Primary') && !Orion.AbilityStatus('Secondary') && !Orion.SpellStatus('Onslaught') && !Orion.SpellStatus('Pierce') && !Orion.SpellStatus('Stagger')){
        Orion.UseAbility('Secondary', true);
        Orion.Wait(50);
    }
}
function getFCChiv() { // for Chivalry cuz dem paladins special
	var fasterCastCap;
	if ( Player.FC() >= 4 && Orion.SkillValue('Magery', 'base') < 700 && Orion.SkillValue('Mysticism', 'base') < 700 ) {
		fasterCastCap = 4;
	} else if ( Player.FC() === 3 && Orion.SkillValue('Magery', 'base') < 700 && Orion.SkillValue('Mysticism', 'base') < 700 ) {
		fasterCastCap = 3;
	} else if ( Player.FC() >=  2 && ( Orion.SkillValue('Magery', 'base') >= 700 || Orion.SkillValue('Mysticism', 'base') >= 700 ) ) {
		fasterCastCap = 2;
	} else if ( Player.FC() <= 2 ) {
		fasterCastCap = Player.FC();
	}
	return fasterCastCap;
}
function getFC2() { // For Magery, Mysticism and Necromancy spells
	var fasterCastCap;
	if ( Player.FC > 2 ) {
		fasterCastCap = 2;
	} else {
		fasterCastCap = Player.FC();
	}
	return fasterCastCap;
}
function getFC4() { // For Bushido, Ninjitsu, Spellweaving spells and Bard Masteries
	var fasterCastCap;
	if ( Player.FC > 4 ) {
		fasterCastCap = 4;
	} else {
		fasterCastCap = Player.FC();
	}
	return fasterCastCap;
}
function getFCR() {
	var castingRecoveryCap;
	if ( Player.FCR > 6 ) {
		castingRecoveryCap = 6;
	} else {
		castingRecoveryCap = Player.FCR();
	}
	var fasterCastRecovery = (6 - castingRecoveryCap) / 4 * 1000 + 250;
	return fasterCastRecovery;
}
/*
SW TIMERS
GOR	-	90 seconds
ATT	-	180 seconds
EV		-	300 seconds
*/
function getSpellInfo(spellName) {
	const SPELL_LIST = {
		'Bushido' : {
			'Confidence': {minSkill: 25, maxSkill: 60, castTime: 1000, manaCost: 10},
			'CounterAttack': {minSkill: 400, maxSkill: 750, castTime: 1000, manaCost: 5},
			'Evasion': {minSkill: 600, maxSkill: 950, castTime: 1000, manaCost: 10},
			'HonorableExecution': {minSkill: 250, maxSkill: 0, castTime: 1000, manaCost: 0},
			'LightningStrike': {minSkill: 500, maxSkill: 0, castTime: 1000, manaCost: 10},
			'MomentumStrike': {minSkill: 700, maxSkill: 0, castTime: 1000, manaCost: 10}
		},
		'Chivalry': {
			'CleanseByFire': {minSkill: 50, maxSkill: 550, castTime: 1250, manaCost: 10},
			'CloseWounds': {minSkill: 0, maxSkill: 500, castTime: 1750, manaCost: 10},
			'ConsecrateWeapon': {minSkill: 150, maxSkill: 650, castTime: 1000, manaCost: 10},
			'DispelEvil': {minSkill: 350, maxSkill: 850, castTime: 1000, manaCost: 10},
			'DivineFury': {minSkill: 250, maxSkill: 750, castTime: 1250, manaCost: 15},
			'EnemyOfOne': {minSkill: 450, maxSkill: 950, castTime: 1000, manaCost: 20},
			'HolyLight': {minSkill: 550, maxSkill: 1050, castTime: 2000, manaCost: 10},
			'NobleSacrifice': {minSkill: 650, maxSkill: 1150, castTime: 1750, manaCost: 20},
			'RemoveCurse': {minSkill: 50, maxSkill: 550, castTime: 2250, manaCost: 20},
			'SacredJourney': {minSkill: 150, maxSkill: 650, castTime: 1750, manaCost: 10}
		},
		'Magery': {
			'Clumsy': {minSkill: 0, maxSkill: 200, castTime: 1000, manaCost: 4},
			'CreateFood': {minSkill: 0, maxSkill: 200, castTime: 1000, manaCost: 4},
			'Feeblemind': {minSkill: 0, maxSkill: 200, castTime: 1000, manaCost: 4},
			'Heal': {minSkill: 0, maxSkill: 200, castTime: 1000, manaCost: 4},
			'MagicArrow': {minSkill: 0, maxSkill: 200, castTime: 1000, manaCost: 4},
			'NightSight': {minSkill: 0, maxSkill: 200, castTime: 1000, manaCost: 4},
			'ReactiveArmor': {minSkill: 0, maxSkill: 200, castTime: 1000, manaCost: 4},
			'Weaken': {minSkill: 0, maxSkill: 200, castTime: 1000, manaCost: 4},
			
			'Agility': {minSkill: 0, maxSkill: 350, castTime: 1250, manaCost: 6},
			'Cunning': {minSkill: 0, maxSkill: 350, castTime: 1250, manaCost: 6},
			'Cure': {minSkill: 0, maxSkill: 350, castTime: 1250, manaCost: 6},
			'Harm': {minSkill: 0, maxSkill: 350, castTime: 1250, manaCost: 6},
			'MagicTrap': {minSkill: 0, maxSkill: 350, castTime: 1250, manaCost: 6},
			'MagicUntrap': {minSkill: 0, maxSkill: 350, castTime: 1250, manaCost: 6},
			'Protection': {minSkill: 0, maxSkill: 350, castTime: 1250, manaCost: 6},
			'Strength': {minSkill: 0, maxSkill: 350, castTime: 1250, manaCost: 6},
			
			'Bless': {minSkill: 90, maxSkill: 490, castTime: 1500, manaCost: 9},
			'Fireball': {minSkill: 90, maxSkill: 490, castTime: 1500, manaCost: 9},
			'MagicLock': {minSkill: 90, maxSkill: 490, castTime: 1500, manaCost: 9},
			'Poison': {minSkill: 90, maxSkill: 490, castTime: 1500, manaCost: 9},
			'Telekinesis': {minSkill: 90, maxSkill: 490, castTime: 1500, manaCost: 9},
			'Teleport': {minSkill: 90, maxSkill: 490, castTime: 1500, manaCost: 9},
			'Unlock': {minSkill: 90, maxSkill: 490, castTime: 1500, manaCost: 9},
			'WallOfStone': {minSkill: 90, maxSkill: 490, castTime: 1500, manaCost: 9},
			
			'ArchCure': {minSkill: 230, maxSkill: 630, castTime: 1500, manaCost: 11},
			'ArchProtection': {minSkill: 230, maxSkill: 630, castTime: 1750, manaCost: 11},
			'Curse': {minSkill: 230, maxSkill: 630, castTime: 1750, manaCost: 11},
			'FireField': {minSkill: 230, maxSkill: 630, castTime: 1750, manaCost: 11},
			'GreaterHeal': {minSkill: 230, maxSkill: 630, castTime: 1750, manaCost: 11},
			'Lightning': {minSkill: 230, maxSkill: 630, castTime: 1750, manaCost: 11},
			'ManaDrain': {minSkill: 230, maxSkill: 630, castTime: 1750, manaCost: 11},
			'Recall': {minSkill: 230, maxSkill: 630, castTime: 1750, manaCost: 11},
			
			'BladeSpirits': {minSkill: 380, maxSkill: 780, castTime: 4500, manaCost: 15},
			'DispelField': {minSkill: 380, maxSkill: 780, castTime: 2000, manaCost: 15},
			'Incognito': {minSkill: 380, maxSkill: 780, castTime: 2000, manaCost: 15},
			'MagicReflection': {minSkill: 380, maxSkill: 780, castTime: 2000, manaCost: 15},
			'MindBlast': {minSkill: 380, maxSkill: 780, castTime: 2000, manaCost: 15},
			'Paralyze': {minSkill: 380, maxSkill: 780, castTime: 2000, manaCost: 15},
			'PoisonField': {minSkill: 380, maxSkill: 780, castTime: 2000, manaCost: 15},
			'Summ.Creature': {minSkill: 380, maxSkill: 780, castTime: 7000, manaCost: 15},
			
			'Dispel': {minSkill: 520, maxSkill: 920, castTime: 2250, manaCost: 20},
			'EnergyBolt': {minSkill: 520, maxSkill: 920, castTime: 2250, manaCost: 20},
			'Explosion': {minSkill: 520, maxSkill: 920, castTime: 2250, manaCost: 20},
			'Invisibility': {minSkill: 520, maxSkill: 920, castTime: 2250, manaCost: 20},
			'Mark': {minSkill: 520, maxSkill: 920, castTime: 2250, manaCost: 20},
			'MassCurse': {minSkill: 520, maxSkill: 920, castTime: 2250, manaCost: 20},
			'ParalyzeField': {minSkill: 520, maxSkill: 920, castTime: 2250, manaCost: 20},
			'Reveal': {minSkill: 520, maxSkill: 920, castTime: 2250, manaCost: 20},
			
			'ChainLightning': {minSkill: 660, maxSkill: 1060, castTime: 2500, manaCost: 40},
			'EnergyField': {minSkill: 660, maxSkill: 1060, castTime: 2500, manaCost: 40},
			'FlameStrike': {minSkill: 660, maxSkill: 1060, castTime: 2500, manaCost: 40},
			'GateTravel': {minSkill: 660, maxSkill: 1060, castTime: 2500, manaCost: 40},
			'ManaVampire': {minSkill: 660, maxSkill: 1060, castTime: 2500, manaCost: 40},
			'MassDispel': {minSkill: 660, maxSkill: 1060, castTime: 2500, manaCost: 40},
			'MeteorSwarm': {minSkill: 660, maxSkill: 1060, castTime: 2500, manaCost: 40},
			'Polymorph': {minSkill: 660, maxSkill: 1060, castTime: 2500, manaCost: 40},
			
			'Earthquake': {minSkill: 800, maxSkill: 1200, castTime: 2750, manaCost: 50},
			'EnergyVortex': {minSkill: 800, maxSkill: 1200, castTime: 2750, manaCost: 50},
			'Resurrection': {minSkill: 800, maxSkill: 1200, castTime: 2750, manaCost: 50},
			'AirElemental': {minSkill: 800, maxSkill: 1200, castTime: 2750, manaCost: 50},
			'SummonDaemon': {minSkill: 800, maxSkill: 1200, castTime: 2750, manaCost: 50},
			'EarthElemental': {minSkill: 800, maxSkill: 1200, castTime: 2750, manaCost: 50},
			'FireElemental': {minSkill: 800, maxSkill: 1200, castTime: 2750, manaCost: 50},
			'WaterElemental': {minSkill: 800, maxSkill: 1200, castTime: 2750, manaCost: 50}
		},
		'Mysticism': {
			'AnimatedWeapon': {minSkill: 330, maxSkill: 705, castTime: 1750, manaCost: 11},
			'Bombard': {minSkill: 580, maxSkill: 955, castTime: 2500, manaCost: 20},
			'CleansingWinds': {minSkill: 580, maxSkill: 955, castTime: 2250, manaCost: 20},
			'EagleStrike': {minSkill: 200, maxSkill: 575, castTime: 1500, manaCost: 9},
			'Enchant': {minSkill: 80, maxSkill: 455, castTime: 2500, manaCost: 6},
			'HailStorm': {minSkill: 700, maxSkill: 1075, castTime: 2500, manaCost: 50},
			'HealingStone': {minSkill: 0, maxSkill: 375, castTime: 5500, manaCost: 4},
			'MassSleep': {minSkill: 450, maxSkill: 825, castTime: 2000, manaCost: 14},
			'NetherBolt': {minSkill: 0, maxSkill: 375, castTime: 1000, manaCost: 4},
			'NetherCyclone': {minSkill: 700, maxSkill: 1075, castTime: 2750, manaCost: 50},
			'PurgeMagic': {minSkill: 80, maxSkill: 455, castTime: 1250, manaCost: 6},
			'RisingColossus': {minSkill: 830, maxSkill: 1205, castTime: 2750, manaCost: 50},
			'Sleep': {minSkill: 200, maxSkill: 575, castTime: 1500, manaCost: 8},
			'SpellPlague': {minSkill: 700, maxSkill: 1075, castTime: 2500, manaCost: 40},
			'SpellTrigger': {minSkill: 450, maxSkill: 825, castTime: 5500, manaCost: 14},
			'StoneForm': {minSkill: 330, maxSkill: 705, castTime: 1750, manaCost: 11}
		},
		'Necromancy': {
			'AnimateDead': {minSkill: 400, maxSkill: 800, castTime: 1750, manaCost: 23},
			'BloodOath': {minSkill: 200, maxSkill: 600, castTime: 1750, manaCost: 13},
			'CorpseSkin': {minSkill: 200, maxSkill: 600, castTime: 2000, manaCost: 11},
			'CurseWeapon': {minSkill: 0, maxSkill: 400, castTime: 1000, manaCost: 7},
			'EvilOmen': {minSkill: 200, maxSkill: 600, castTime: 1000, manaCost: 11},
			'Exorcism': {minSkill: 800, maxSkill: 1200, castTime: 2250, manaCost: 40},
			'HorrificBeast': {minSkill: 400, maxSkill: 800, castTime: 2250, manaCost: 11},
			'LichForm': {minSkill: 700, maxSkill: 1100, castTime: 2250, manaCost: 23},
			'MindRot': {minSkill: 300, maxSkill: 700, castTime: 1750, manaCost: 17},
			'PainSpike': {minSkill: 200, maxSkill: 600, castTime: 1250, manaCost: 5},
			'PoisonStrike': {minSkill: 500, maxSkill: 900, castTime: 2000, manaCost: 17},
			'Strangle': {minSkill: 650, maxSkill: 1050, castTime: 2250, manaCost: 29},
			'SummonFamiliar': {minSkill: 300, maxSkill: 700, castTime: 2250, manaCost: 17},
			'VampiricEmbrace': {minSkill: 990, maxSkill: 1390, castTime: 2250, manaCost: 23},
			'VengefulSpirit': {minSkill: 800, maxSkill: 1200, castTime: 2250, manaCost: 41},
			'Wither': {minSkill: 600, maxSkill: 1000, castTime: 1500, manaCost: 23},
			'WraithForm': {minSkill: 200, maxSkill: 600, castTime: 2250, manaCost: 17}
		},
		'Ninjitsu': {
			'AnimalForm': {minSkill: 0, maxSkill: 400, castTime: 1500, manaCost: 10},
			'Backstab': {minSkill: 400, maxSkill: 1000, castTime: 1000, manaCost: 30},
			'DeathStrike': {minSkill: 850, maxSkill: 1250, castTime: 1000, manaCost: 30},
			'FocusAttack': {minSkill: 300, maxSkill: 700, castTime: 1000, manaCost: 10},
			'KiAttack': {minSkill: 800, maxSkill: 1200, castTime: 1000, manaCost: 25},
			'MirrorImage': {minSkill: 200, maxSkill: 600, castTime: 1750, manaCost: 10},
			'Shadowjump': {minSkill: 500, maxSkill: 900, castTime: 1250, manaCost: 15},
			'SurpriseAttack': {minSkill: 600, maxSkill: 1000, castTime: 1750, manaCost: 20}
		},
		'Spellweaving': {
			'ArcaneCircle': {minSkill: 0, maxSkill: 400, castTime: 1000, manaCost: 24},
			'ArcaneEmpowerment': {minSkill: 240, maxSkill: 640, castTime: 4000, manaCost: 50},
			'Attunement': {minSkill: 0, maxSkill: 400, castTime: 1250, manaCost: 24},
			'DryadAllure': {minSkill: 520, maxSkill: 920, castTime: 3250, manaCost: 40},
			'EssenceOfWind': {minSkill: 520, maxSkill: 920, castTime: 3250, manaCost: 40},
			'EtherealVoyage': {minSkill: 240, maxSkill: 640, castTime: 4000, manaCost: 32},
			'GiftOfLife': {minSkill: 380, maxSkill: 780, castTime: 4250, manaCost: 70},
			'GiftOfRenewal': {minSkill: 0, maxSkill: 400, castTime: 3500, manaCost: 24},
			'ImmolatingWeapon': {minSkill: 100, maxSkill: 500, castTime: 1250, manaCost: 32},
			'NaturesFury': {minSkill: 0, maxSkill: 400, castTime: 1750, manaCost: 24},
			'ReaperForm': {minSkill: 240, maxSkill: 640, castTime: 2750, manaCost: 34},
			'SummonFey': {minSkill: 380, maxSkill: 780, castTime: 2000, manaCost: 10},
			'SummonFiend': {minSkill: 380, maxSkill: 780, castTime: 2000, manaCost: 10},
			'Thunderstorm': {minSkill: 100, maxSkill: 500, castTime: 1750, manaCost: 32},
			'Wildfire': {minSkill: 660, maxSkill: 1060, castTime: 2750, manaCost: 50},
			'WordOfDeath': {minSkill: 830, maxSkill: 1230, castTime: 3750, manaCost: 50}
		}
	}
	var value = 0;
	for (var catagory in SPELL_LIST) {
		var spells = SPELL_LIST[catagory];
		for (var spell in spells) {
			var obj = spells[spell];
			for (var keys in obj) {
				if (spellName === spell && keys === 'castTime') {
					value = obj[keys];
					break;
				}
			}
		}
	}
	return value;
}
function getTarget(){
	var mob;
	const RANGE = Shared.GetVar('Weapon Range', getWeaponRange());
	var namedMobOnly = Shared.GetVar('Named Monsters Only');
	
	mob = getPriorityTarget();
	
	if ( mob !== null ) {
		if (mob.Hits() == mob.MaxHits() && Orion.Timer('Honor') >= -1 && mob.Distance() <= 12 && Orion.SkillValue('Bushido', 'base') >= 500) {
			while ( mob.Distance() > 8 ) {
				Orion.WalkTo(mob.X(), mob.Y(), mob.Z(), 8, 14, 1, 1, 2000);
			}
			Orion.InvokeVirtue('Honor');
			Orion.WaitTargetObject(mob.Serial());
			Orion.SetTimer('Honor', -1000);
		}
		//Orion.ClearHighlightCharacters(mob.Serial(), true);
		Orion.AddHighlightCharacter(mob.Serial(), 12345, true);
		return mob;
	
	} else if ( !namedMobOnly ) {
		mob = Orion.FindTypeEx(any, any, ground, 'mobile|ignoreself|ignorefriends', 24, 'gray|criminal|orange|red');
		
		if (mob.length) {
			for (var i = 0; i < mob.length; i++) {
				mob.sort(function(m1, m2){ return m1.Distance() - m2.Distance() });
				const PATH_ARR = Orion.GetPathArray(mob[i].X(), mob[i].Y(), mob[i].Z(), RANGE, 14, 1, 1);
				
				if (mob.length && !Orion.Contains(mob[i].Properties(), Shared.GetVar('Ignore Prop')) ) {
					if (mob[i].Distance() > RANGE + 1  && mob !== undefined && (PATH_ARR.length === RANGE - 1 || PATH_ARR.length >= 100)) {
						//Orion.Print( 'can not reach, ignoring '+ mob[i].Name() +' accordingly' );
						Orion.Ignore(mob[i].Serial());
						continue;
					}
					
					if (mob[i].Hits() == mob[i].MaxHits() && Orion.Timer('Honor') >= -1 && mob[i].Distance() <= 12 && Orion.SkillValue('Bushido', 'base') >= 500) {
						while ( mob[i].Distance() > 8 ) {
							Orion.WalkTo(mob[i].X(), mob[i].Y(), mob[i].Z(), 8, 14, 1, 1, 2000);
						}
						Orion.InvokeVirtue('Honor');
						Orion.WaitTargetObject(mob[i].Serial());
						
						if ( Orion.InJournal('cannot be seen', 'sys', '0', any, Orion.Now() - 1500) ) {
							Orion.WalkTo(mob[i].X(), mob[i].Y(), mob[i].Z(), 1, 14, 1, 1, 10000);
						}
						Orion.SetTimer('Honor', -1000);
					}
					/* 1177/1174 gold, 2772 void, 1170/1171 bluepurp, 98765432 grey smoke, 12345 white, 123456-90009/777777/66666666 ethereal
						2769/1174 black, 1152/1149 white, 2720/1173/1176 gold, 2210/1154 green dark
						1920 shadow black, 2772 void, 2722/1155 midnight blue, 1151 glacial
						1156/1171 red, 1157/1170 purple, 1158 yelloblu, 1160 fire OJ, 1177/1178/1188 blackgreen
						1179 blackred, 1180 blackblue, 1181 blackteal
					*/
					//Orion.ClearHighlightCharacters(mob[i].Serial(), true);
					Orion.AddHighlightCharacter(mob[i].Serial(), 123456, true);
					return mob = mob[i];
				}
			}
		}
	}
}
function getGroupedTargets() {
	const RANGE = Shared.GetVar('Weapon Range', getWeaponRange());
	var monstersNear = Orion.FindTypeEx('!0x00A4|!0x033D|!0x002F', any, ground, 'mobile|ignoreself|ignorefriends|inlos', RANGE, 'gray|criminal|orange|red');
	var targetSerial = Orion.ClientLastTarget();
	var target = Orion.FindObject(targetSerial);
	var aoe = false
	
	if ( target == null ) { return; }
	if ( target.Distance()  > RANGE ) { return; }
	var targetXMin = target.X() - 4;
	var targetXMax = target.X() + 4;
	var targetYMin = target.Y() - 4;
	var targetYMax = target.Y() + 4;
	for ( var i = 0, count = monstersNear.length; i < count; i++ ) {
		if ( monstersNear[i].Serial() === target.Serial() ) { continue; }
		if ( monstersNear[i].X() > targetXMin && monstersNear[i].X() < targetXMax && monstersNear[i].Y() > targetYMin && monstersNear[i].Y() < targetYMax ) {
			//Orion.AddHighlightCharacter(monstersNear[i].Serial(), 123456, true);
			aoe = true;
			break;
		}
	}
	return aoe;
}
function getPriorityTarget(){
	var targets = Orion.FindTypeEx(any, any, ground, 'mobile|ignoreself|ignorefriends|inlos', 24, 'gray|criminal|orange|red');
	var namedMonsters = Shared.GetVar('Named Monsters');
	var returnValue = null;
	
	for (i = targets.length - 1; i >= 0; i--) {
		if (targets[i] != null) {
			if (!Orion.Contains(targets[i].Properties(), namedMonsters)) {
				targets.splice(i, 1);
			}
		}
	}
	
	for (var i = 0; i < targets.length; i++) {
		if (targets[i] != null) {
			if (Orion.Contains(targets[i].Properties(), namedMonsters)) {
				targets.sort(function(tar1, tar2){ return tar1.Distance() - tar2.Distance() });
				returnValue = targets[i];
				break;
			}
		}
	}
	return returnValue;
}
function getWeaponRange() {
	var range = 1;
	var weaponTwoHander = Orion.ObjAtLayer('LeftHand');
	var weaponOneHander = Orion.ObjAtLayer('RightHand'); // Cyclone & Bow & Heavy Xbow are 1 handed
	
	if ( weaponTwoHander != null && Orion.Contains(weaponTwoHander.Properties(), 'Range') ) {
		range = weaponTwoHander.Properties().match(/Range\s(\d*)/i)[1]
	
	} else  if ( weaponOneHander != null && Orion.Contains(weaponOneHander.Properties(), 'Range') ) {
		range = weaponOneHander.Properties().match(/Range\s(\d*)/i)[1]
	
	} else {
		range = 1;
	}
	return range;
}
function getDurability() {
	var itemsToRepair = [];
	
	for (var itemLayer = 1; itemLayer < 25; itemLayer++) {
		var item = Orion.ObjAtLayer(itemLayer);
		
		if (item === null) { continue; }
		
		if (item && Orion.Contains(item.Properties(), 'Durability')) {
			var value = /Durability (\d+)\s\/\s(\d+)/.exec(item.Properties());
			const MIN_DURABILITY = Number(value[2]) * .3;
			
			if(value.length > 2 && Number(value[1]) < MIN_DURABILITY){
				itemsToRepair.push(item.Serial());
			}
		}
	}
	return itemsToRepair;
}
function getDress(){
var tempDressArray = [];
	for(var d = 1; d < 24; d++){
		var item = Orion.ObjAtLayer(d);
		if(item){
			tempDressArray.push(item.Serial());
		}
	}
	Orion.SetDressList('Equipment', tempDressArray);
}
function getGump() {
	Orion.Wait(2000);
	const ID = '0x000001F2|0x00002415'; //1. Atlas, 2. Repair Bench
	const GUMP_COUNT = Orion.GumpCount();
	var index = 0;
	
	while(index < GUMP_COUNT){
		const GUMP = Orion.GetGump(index);
		
		if (GUMP && Orion.GumpExists('generic', GUMP.Serial(), GUMP.ID()) && Orion.Contains(GUMP.ID(), ID)) {
			
			break; 
		}
		index++;
		Orion.Wait(20);
	}
	return GUMP;
}
function getMapNumber() { // 0 fell, 5 ter mur
    var playerMap = Player.Map();
    
    if (Player.Map() !== Orion.FindObject(backpack).Map()) {
        playerMap = Orion.FindObject(backpack).Map();
	}
	return playerMap;
}
function calculateCenteredX(guiWidth, text, averageCharWidth) {
	var textWidth = text.length * averageCharWidth;
	return (guiWidth - textWidth) / 2;
}
function calculateSpecialsLMC() {
	var combinedSkill = Orion.SkillValue('Swordsmanship', 'base') + Orion.SkillValue('Mace Fighting', 'base') + Orion.SkillValue('Fencing', 'base') + Orion.SkillValue('Archery', 'base') + Orion.SkillValue('Parry', 'base') + Orion.SkillValue('Lumberjacking', 'base') + Orion.SkillValue('Stealth', 'base') + Orion.SkillValue('Poisoning', 'base') + Orion.SkillValue('Bushido', 'base') + Orion.SkillValue('Ninjitsu', 'base') + Orion.SkillValue('Throwing', 'base');
	var combinedSkillReduced = combinedSkill/10;
	var combinedSkillValue = 0;
	if ( combinedSkillReduced >= 200 && combinedSkillReduced < 300 ) {
		combinedSkillValue = 5;
	} else if ( combinedSkillReduced >= 300 ) {
		combinedSkillValue = 10;
	} else {
		combinedSkillValue = 0;
	}
	var abilityCost = 0
	var ability = getSpecialAbilities();
	if ( ability[2] >= ability[3] ) {
		abilityCost = ability[2];
	} else {
		abilityCost = ability[3];
	}
	var manacost = Math.ceil(abilityCost - combinedSkillValue - (Player.LMC()  / 100 * ( abilityCost - combinedSkillValue ) ) );
	return manacost;
}
function setOAOptions() {
	if (Orion.OAOptionGet('Tracker') === '0') {
		Orion.OAOptionSet('Tracker', '1');
	}
	if (Orion.OAOptionGet('FastRotation') === '0') {
		Orion.OAOptionSet('FastRotation', '1');
	}
	if (Orion.OAOptionGet('RecurseContainersSearch') === '0') {
		Orion.OAOptionSet('recurseContainersSearch', '1');
	}
	if (Orion.OAOptionGet('Autostart') === '0') {
		Orion.OAOptionSet('Autostart', '1');
	}
	if (Orion.OAOptionGet('SoundEcho') === '0') {
		Orion.OAOptionSet('SoundEcho', '1');
	}
	if (Orion.OAOptionGet('AnimationEcho') === '0') {
		Orion.OAOptionSet('AnimationEcho', '1');
	}
	if (Orion.OAOptionGet('EffectEcho') === '0') {
		Orion.OAOptionSet('EffectEcho', '1');
	}
	if (Orion.OAOptionGet('ObjectInspector') === '0') {
		Orion.OAOptionSet('ObjectInspector', '1');
	}
	if (Orion.OAOptionGet('JournalEcho') === '0') {
		Orion.OAOptionSet('JournalEcho', '1');
	}
	if (Orion.OAOptionGet('SearchDistance') === '0') { // Echo Damage
		Orion.OAOptionSet('SearchDistance', '1');
	}
	if (Orion.OAOptionGet('UseDistance') === '0') { // Echo Global Chat
		Orion.OAOptionSet('UseDistance', '1');
	}
		/*
			if (Orion.OAOptionGet('ObjectSearchDistance') !== '2') {
no				Orion.OAOptionSet('ObjectSearchDistance', '2');
work		}
			if (Orion.OAOptionGet('UseObjectsDistance') !== '2') {
				Orion.OAOptionSet('UseObjectsDistance', '2');
			}
		*/
	if (Orion.OAOptionGet('OpenCorpseDistance') !== '2') {
		Orion.OAOptionSet('OpenCorpseDistance', '2');
	}
	if (Orion.OAOptionGet('CorpseKeepDelay') !== '300000') {
		Orion.OAOptionSet('CorpseKeepDelay', '300000');
	}
	if (Orion.OAOptionGet('WaitTargetsDelay') !== '1200') {
		Orion.OAOptionSet('WaitTargetsDelay', '1200');
	}
	if (Orion.OAOptionGet('MoveItemsDelay') !== '1200') {
		Orion.OAOptionSet('MoveItemsDelay', '1200');
	}
	if (Orion.OAOptionGet('UseItemsDelay') !== '1200') {
		Orion.OAOptionSet('UseItemsDelay', '1200');
	}
	/*	LISTS > FRIENDS && ENEMIES
	*/
	if (Orion.OAOptionGet('FeelPartyMembersAsFriends') === '0') {
		Orion.OAOptionSet('FeelPartyMembersAsFriends', '1');
	}
	if (Orion.OAOptionGet('FeelFriendlyMobilesAsFriends') === '0') {
		Orion.OAOptionSet('FeelFriendlyMobilesAsFriends', '1');
	}
	if (Orion.OAOptionGet('FeelGuildTagsAsFriends') === '0') {
		Orion.OAOptionSet('FeelGuildTagsAsFriends', '1');
	}
	if (Orion.OAOptionGet('FeelGuildTagsAsEnemies') === '0') {
		Orion.OAOptionSet('FeelGuildTagsAsEnemies', '1');
	}
	/*	HOTKEYS
	*/
	if (Orion.OAOptionGet('PassHotkeys') === '0') {
		Orion.OAOptionSet('PassHotkeys', '1');
	}
	/*	AGENTS > DRESS && PARTY
	*/
	if (Orion.OAOptionGet('DressUseNewEquipPackets') === '0') {
		Orion.OAOptionSet('DressUseNewEquipPackets', '1');
	}
	if (Orion.OAOptionGet('PartyAutoAcceptFriendInvities') === '0') {
		Orion.OAOptionSet('PartyAutoAcceptFriendInvities', '1');
	}
	if (Orion.OAOptionGet('PartyAutoDeclineEnemyInvities') === '0') {
		Orion.OAOptionSet('PartyAutoDeclineEnemyInvities', '1');
	}
}
//--# END of Auto Bot