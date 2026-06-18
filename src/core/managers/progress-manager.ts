export class ProgressManager {
  private lastVisitedScene = "";

  public setLastVisitedScene(sceneKey: string): void {
    this.lastVisitedScene = sceneKey;
  }

  public getLastVisitedScene(): string {
    return this.lastVisitedScene;
  }
}
