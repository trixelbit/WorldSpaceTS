import {Entity} from "./Entity";
import {Vector3} from "../Vector3";

export class AnchorButton extends Entity
{
    public get ImageElement() : HTMLImageElement
    {
        return this._imageElement;
    }
    
    private readonly _anchorElement: HTMLAnchorElement;
  
    private readonly _imageElement: HTMLImageElement;
    
    public constructor(position: Vector3 = Vector3.Zero())
    {
        super("div", "anchor", position);
        this.Element.style.justifyContent = "center";
        this.Element.style.alignItems = "center";
        this.Element.style.padding= "0";
        this.Element.style.margin= "0";
        this.Element.style.background = "transparent";
        
        this._anchorElement = document.createElement("a");
        this._anchorElement.style.justifyContent = "center";
        this._anchorElement.style.alignItems = "center";
        this._imageElement = document.createElement("img");
        this._imageElement.style.width = "100%";
        this._imageElement.style.height = "100%";
        
        this._anchorElement.appendChild(this._imageElement);
        this.Element.appendChild(this._anchorElement);
    }
    
    public AddChildElement(element: HTMLElement)
    {
        this.Element.appendChild(element);
    }
  
    public SetImage(imageSource: string)
    {
        this._imageElement.src = imageSource;
        this._imageElement.style.position = "absolute";
        this._imageElement.style.zIndex = "0";
    }
    
    public SetLink(link: string)
    {
        this._anchorElement.href = link;
        this._anchorElement.target = "_blank";
    }
}