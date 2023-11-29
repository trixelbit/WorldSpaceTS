import {Entity} from "../Entities/Entity";
import {Vector3} from "../Math/Vector3";
import {Vector2} from "../Math/Vector2";
import {InputSystem} from "../Utilities/InputSystem";
import {Camera} from "../Services/Camera";

export abstract class View
{
    public static Instance: View;
  
    public static get ElapsedTime() : number
    {
        return View._elapsedTime;
    }
    
    private static _elapsedTime: number = 0;
   
    private _entities: Entity[] = [];
    
    protected readonly _viewDiv: HTMLDivElement;
  
    private _input = new InputSystem();
    
    
    public constructor()
    {
        View.Instance = this;
        this._viewDiv = document.createElement('div');
        this._viewDiv.style.perspective = "100px";
        this._viewDiv.id = "WorldView";
        this._viewDiv.style.position = "fixed";
        this._viewDiv.style.left = "0";
        this._viewDiv.style.top = "0";
        this._viewDiv.style.width = "100%";
        this._viewDiv.style.height = "100%";
        this._viewDiv.style.display = "flex";
        this._viewDiv.style.transformStyle = "preserve-3d";
        this._viewDiv.style.justifyContent = "center";
        this._viewDiv.style.alignItems = "center";
        this._viewDiv.style.overflowX = "hidden";
        this._viewDiv.style.overflowY = "hidden";
        this._viewDiv.style.background = "white";
        this._viewDiv.style.margin = "0";
        this._viewDiv.style.padding = "0";
        
        document.body.style.padding = "0";
        document.body.style.margin = "0";
        document.body.appendChild(this._viewDiv);
    }
    
    public AddEntity(entity: Entity)
    {
        this._entities.push(entity);
    }
    
    public abstract Build(): void;
    
    public Start()
    {
        for(const entity of this._entities)
        {
            entity.Start();
            this._viewDiv.appendChild(entity.Element);
        }
    }
    
    public Update()
    {
        for(const entity of this._entities)
        {
            Camera.Update();
            try
            {
                entity.Update();
            }
            catch(e)
            {
                console.error(e);
            }
        }

        for(const entity of this._entities)
        {
            entity.ApplyCameraPositionToElement(Camera.WorldPosition);
        }

        View._elapsedTime = View._elapsedTime + 0.05;
        
        this._input.ResetReleasedKeys(); 
    }
    
    
}

export enum ESiteMode
{
    Play,
    Edit
}
