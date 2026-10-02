# ADR-0003: Keep API Rescue Lab browser-local and deterministic

## Status

Accepted

## Date

2026-10-02

## Context

The Lab demonstrates how a frontend handles slow, failed, and invalid responses while retaining useful data. Visitors need to reproduce each case reliably. A real service or external API would add availability, cost, privacy, and deployment concerns that could obscure the frontend behavior this portfolio aims to show. The choice of simulation boundary is not apparent from a UI that looks like a request flow.

## Decision

Keep API Rescue Lab as a deterministic browser-local simulation using sample data. Its scenarios must produce repeatable results without an HTTP request, backend, external API, or persistent store. Label the experience as a local simulation so it does not imply production API integration. Treat the simulated response as untrusted input before it can replace the displayed data. The [current design specification](../DESIGN.md) owns the exact scenarios, timings, state behavior, and UI copy.

A future real API demonstration requires a separate decision about its purpose, data, availability, and security. It must not silently replace this Lab's reproducible behavior.

## Consequences

Visitors can reproduce failures and recovery without a network dependency, and tests can exercise the same scenarios. The site has no Lab service to operate and handles no customer data. The Lab cannot prove behavior against a real network or production backend; public copy must state that limit. The fixed scenarios show selected failure modes rather than the full range of real API behavior.

## Alternatives considered

- Use a real backend. It would demonstrate deployment and network integration, but adds operations and moves attention away from frontend recovery behavior.
- Use an external public API. Availability, response shape, and rate limits would make the demonstration unreliable.
- Use a mock server. It could exercise HTTP without a production service, but adds infrastructure without improving the visitor's ability to reproduce the intended states.

## References

- [ADR-0001: ADR process](0001-adopt-adr-process-and-format.md)
- [Current design specification](../DESIGN.md)
- [Repository overview and Lab limits](../../README.md)
- [Lab simulation and state transitions](../../lib/rescue-lab.ts)
