export class InputSystem
{
  private _downKeys: Map<string, boolean>;

  private _pressedKeys: Map<string, boolean>;

  private _releasedKeys: Map<string, boolean>;


  constructor()
  {
    this._downKeys = new Map<string, boolean>();

    this._pressedKeys = new Map<string, boolean>();

    this._releasedKeys = new Map<string, boolean>();


    document.addEventListener("DOMContentLoaded", () => 
    {
      document.addEventListener("keydown", (event: KeyboardEvent) => 
      {
          this._downKeys.set(event.key, true);
          this._pressedKeys.set(event.key, true);
          this._releasedKeys.set(event.key, false);
      });

      document.addEventListener("keyup",  (event: KeyboardEvent) =>
      {
          this._downKeys.set(event.key, false);
          this._pressedKeys.set(event.key, false);
          this._releasedKeys.set(event.key, true);
      });
    });
  }

  public IsKeyDown(key: string): boolean
  {
    if(!this._downKeys.has(key))
    {
      //console.log("IsKeyDown Error: Key value " + key + " does not exist in input system.");
      return false;
    } 

    const value = this._downKeys.get(key);
    return value === undefined ? false : value;
  }

  public IsKeyPressed(key: string): boolean
  {
    if(!this._pressedKeys.has(key))
    {
      //console.log("IsKeyPressed Error: Key value " + key + " does not exist in input system.");
      return false;
    }
    
    const value = this._pressedKeys.get(key);
    return value === undefined ? false : value;
  }

  public IsKeyReleased(key: string): boolean
  {
    if(!this._releasedKeys.has(key))
    {
      //console.log("IsKeyReleased Error: Key value " + key + " does not exist in input system.");
      return false;
    }
    
    const value = this._releasedKeys.get(key);
    return value === undefined ? false : value;
  }


  public ResetReleasedKeys(): void
  {
    for(var key in this._releasedKeys)
    {
       this._releasedKeys.set(key, false);
    }
  }
} 
