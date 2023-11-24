
import {Entity} from "./Entity";
import { Vector2 } from "../Vector2";
import {Vector3} from "../Vector3";

export class GameCard
{
  // Assets
  private _iconPath: string = "";

  private _name: string = "";

  private _status: EGameStatus = EGameStatus.development;

  private _previewPath: string = "";

  private _description: string = "";

  private _width: number;
  
  // HTML Element References
  private _containingDiv: HTMLDivElement;

  private _nameElement: HTMLHeadingElement;

  private _statusElement: HTMLImageElement;

  private _iconElement: HTMLImageElement;

  private _previewElement: HTMLVideoElement;

  private _descriptionElement: HTMLParagraphElement;


  public constructor(width: number, name: string, gameIcon: string, status: EGameStatus, previewVideo: string, description: string)
  {
    this._width = width;
    this._name = name;
    this._iconPath = gameIcon;
    this._status = status;
    this._previewPath = previewVideo;
    this._description = description;
    
    
    this._containingDiv = document.createElement('div');
    this._containingDiv.style.width = width.toString();
    this._nameElement = document.createElement('p');
    this._statusElement = document.createElement('img');
  
    // icons setup
    this._iconElement = document.createElement('img');
    this._iconElement.width = 200;
    this._iconElement.style.borderRadius = "50%";
    
    this._previewElement = document.createElement('video');
    this._previewElement.style.width = "100%";
    
    //this._previewElement.play();
    this._descriptionElement = document.createElement('p');
    
    this._containingDiv.appendChild(this._iconElement);
    this._containingDiv.appendChild(this._nameElement);
    this._containingDiv.appendChild(document.createElement('br'));
    this._containingDiv.appendChild(this._statusElement);
    this._containingDiv.appendChild(document.createElement('br'));
    this._containingDiv.appendChild(this._previewElement);
    this._containingDiv.appendChild(document.createElement('br'));
    this._containingDiv.appendChild(this._descriptionElement);

  }

  private GetStatusImage() : string
  {
    switch (this._status) 
    {
      case EGameStatus.development:
        return "./Images/Development.png";

      case EGameStatus.published:
        return "./Images/Published.png";

      default:
          throw new Error("Incorrect Enum Value");
    }
  }

  public AttachTo(parentDiv: HTMLDivElement)
  {
    parentDiv.appendChild(this._containingDiv);
  }

  public Render()
  {  
    this._iconElement.src = this._iconPath;
    this._nameElement.textContent = this._name;
    this._statusElement.src = this.GetStatusImage();
    this._previewElement.src = this._previewPath;
    this._descriptionElement.textContent = this._description;
  }
}

export enum EGameStatus
{
  development,
  published
}


/**
 * Will display a list of games cards.
 */
export class GameList extends Entity
{
  private _gameList: GameCard[];


  public get DivElement(): HTMLDivElement
  {
    return this.Element as HTMLDivElement;
  }


  /**
   * @param position {Vector2} Position of the list.
   * @param width {string} Width of the list. String to allows differing units such as '%' or 'px'.
   */
  public constructor(position: Vector3, width: string, height: string)
  {
    super("div", "Games", position);
    this._gameList = [];
    this.DivElement.style.width = width;
    this.DivElement.style.height = height
    this.DivElement.style.backgroundColor = "#071122"
    this.DivElement.style.borderRadius = "2%";
    this.DivElement.style.padding = "1%";
  }

  public override Start() : void
  {
    super.Start();
    
    this.Render();
  }
  
  public AddGameCard(gameCard: GameCard) : void
  {
    this._gameList.push(gameCard);
    gameCard.AttachTo(this.DivElement);
  }

  public Render() : void
  {
    for(const card of this._gameList)
    {
      card.Render();
    }
  }
}





