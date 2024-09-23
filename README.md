# Basic Phaser Editor script nodes

This project contains the main scripts to use with a Phaser Editor project.

It includes the basic script nodes and user components: `ScriptNode` and `UserComponent` classes.

The scripts are coded in TypeScript with ES modules.

## Installing (NPM)

Install this package in your game:

```
npm install @phaserjs/editor-scripts-base
```

Also, you should add this package to the `phasereditor2d.config.json` file in your project, in the `scripts` section:

```json
{
    "scripts": ["@phaserjs/editor-scripts-base"]
}
```

## Installing (vanilla JS)

* Get the files in the [browser](./browser/) folder and copy them into your JavaScript project. It includes Phaser Editor files and JavaScript files.

## User components

This package provides a couple of general-purpose user components. Including the `UserComponent` class, which is the base class for all user components.

* `UserComponent` - it is a class you can use as the base class for your user components.
* **Action Target** - it provides information to script nodes about what object is the target of an action.

### Base scripts

Contains basic/abstract functionality. Often, you will create prefab variants of them (extend them).

* **ScriptNode** - the base class for all the scripts.

## Target Action component

This user component is a hint to the action-like script nodes about what object is the target of the action. The possible targets are the game object of the script node (the default), or any of the arguments of the `execute(...)` method of the action.

The **Target* property of the component allows these values: `GAME_OBJECT` (default), `ARG_1`, `ARG_2`, `ARG_3`, etc...

If you are implementing a custom action script, you may want to look into the **Target Action** component to determine the object to receive the action. This is an example:

```js
class MyAction {

    execute(...args: any[]) {

        const obj = TargetActionComp.getActionTarget(this, args);

        this.performMyCustomAction(obj);
    }
}
```

## ScriptNode

The base of all the scripts. Probably it is already available in your project (if you generated it with Phaser Editor).

This class provides methods for managing the node's children, and implementing the scene events: `awake`, `start`, and `update`.