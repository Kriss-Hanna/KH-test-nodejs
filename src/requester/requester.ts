export class Requester {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async post<T>(data: T) {
    const response = await fetch(this.url, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    return await this.handleResponse(response);
  }

  public async get(id?: string) {
    const response = await fetch(id ? `${this.url}/${id}` : this.url);

    return await this.handleResponse(response);
  }

  private async handleResponse<R>(response: Response): Promise<R> {
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${
          response.status
        }, message: ${await response.text()}`
      );
    }
    return await response.json();
  }
}
