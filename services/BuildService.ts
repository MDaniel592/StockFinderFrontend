import BuildResponse from "interfaces/BuildResponse";
import RegisterBuild from "interfaces/RegisterBuild";

export default class BuildService {
  /**
   * Método usado para registrar nuevas Builds
   *
   * @param RegisterBuild objeto con los valores de la Build.
   * @returns La promesa con un 200 OK o un json del estilo {error: descripción del error}
   */
   async registerBuild(buildInfo: RegisterBuild): Promise<BuildResponse> {
    try {
      let response = await fetch(`${process.env.NEXT_API}/builds/register_build`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildInfo),
      });

      let jsonResponse = await response.json();
      if (!response.ok) return Promise.resolve({ error: jsonResponse.error });

      return Promise.resolve({build_uuid: jsonResponse.build_uuid});

    } catch (error) {
      return Promise.reject();
    }

  }

}
