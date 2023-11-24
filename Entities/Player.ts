import { PlayerMovement } from "../Components/PlayerMovement";
import { InputSystem } from "../InputSystem";
import { ImageElement } from "./ImageElement";
import { Entity } from "./Entity";

export class Player extends ImageElement
{
  private _state: EPlayerState = EPlayerState.Idle;
  private _direction: EDirectionState = EDirectionState.Down;
  private _spriteTable = [
    "Images/idle_up.png",
    "Images/idle_down.png",
    "Images/idle_left.png",
    "Images/idle_right.png",
    "Images/run_up.gif",
    "Images/run_down.gif",
    "Images/run_left.gif",
    "Images/run_right.gif",
  ];

  private _movement: PlayerMovement;

  constructor(inputSystem: InputSystem)
  {
    super("Player", "");
    this.ImageElement.src = "Images/idle_up.png";
    this._movement = new PlayerMovement(this, inputSystem, 4);
    this.AddComponent(this._movement);
  }

  public override Update() 
  {
    super.Update();

    this.UpdateSpriteState();
  }

  private UpdateSpriteState(): void
  {
    var vector = this._movement.Velocity;
   
    if(vector.Magnitude() > 0)
    {
      this._state = EPlayerState.Walking;
    }
    else
    {
      this._state = EPlayerState.Idle;
    }

    if(vector.x > 0)
    {
      this._direction = EDirectionState.Right;
    }
    else if(vector.x < 0)
    {
      this._direction = EDirectionState.Left;
    }

    if(vector.y > 0)
    {
      this._direction = EDirectionState.Down;
    }
    else if(vector.y < 0)
    {
      this._direction = EDirectionState.Up;
    }

    var index = (this._state * 4) + this._direction;
    this.SetSprite(this._spriteTable[index]);
  }
}

enum EPlayerState
{
  Idle = 0,
  Walking = 1
}

enum EDirectionState
{
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
}
