// Claude MCP Bridge — Figma Plugin
// Receives commands from Claude Code via local MCP server
// and executes them using the Figma Plugin API

figma.showUI(__html__, { width: 320, height: 240, title: "Claude MCP Bridge" });

// ── Helper: hex string → Figma RGB ──
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  return { r, g, b };
}

// ── Helper: resolve variable type from value ──
function resolveType(value) {
  if (typeof value === 'string' && value.startsWith('#')) return 'COLOR';
  if (typeof value === 'number') return 'FLOAT';
  if (typeof value === 'string') return 'STRING';
  if (typeof value === 'boolean') return 'BOOLEAN';
  return 'STRING';
}

// ── Command handlers ──
const handlers = {

  // List all variable collections
  get_collections: () => {
    const collections = figma.variables.getLocalVariableCollections();
    return collections.map(c => ({
      id: c.id,
      name: c.name,
      modes: c.modes,
      variableCount: c.variableIds.length
    }));
  },

  // List all variables
  get_variables: () => {
    return figma.variables.getLocalVariables().map(v => ({
      id: v.id,
      name: v.name,
      type: v.resolvedType,
      collectionId: v.variableCollectionId
    }));
  },

  // Create a variable collection with optional modes
  create_collection: ({ name, modes }) => {
    // Check if already exists — update instead of duplicate
    const existing = figma.variables.getLocalVariableCollections()
      .find(c => c.name === name);
    if (existing) {
      // Rename modes if needed
      if (modes && modes.length > 0) {
        existing.renameMode(existing.modes[0].modeId, modes[0]);
        for (let i = 1; i < modes.length; i++) {
          if (existing.modes[i]) {
            existing.renameMode(existing.modes[i].modeId, modes[i]);
          } else {
            existing.addMode(modes[i]);
          }
        }
      }
      return { id: existing.id, name: existing.name, modes: existing.modes, existed: true };
    }

    const collection = figma.variables.createVariableCollection(name);

    if (modes && modes.length > 0) {
      collection.renameMode(collection.modes[0].modeId, modes[0]);
      for (let i = 1; i < modes.length; i++) {
        collection.addMode(modes[i]);
      }
    }

    return { id: collection.id, name: collection.name, modes: collection.modes };
  },

  // Create or update a variable
  create_variable: ({ collectionId, name, type, values }) => {
    const collection = figma.variables.getVariableCollectionById(collectionId);
    if (!collection) throw new Error(`Collection not found: ${collectionId}`);

    // Check if variable already exists in this collection
    let variable = figma.variables.getLocalVariables()
      .find(v => v.variableCollectionId === collectionId && v.name === name);

    if (!variable) {
      const resolvedType = type || (values ? resolveType(Object.values(values)[0]) : 'STRING');
      variable = figma.variables.createVariable(name, collection, resolvedType);
    }

    // Set values per mode
    if (values) {
      for (const [modeId, value] of Object.entries(values)) {
        if (value && typeof value === 'object' && value.type === 'VARIABLE_ALIAS') {
          // Alias to another variable
          const aliasTarget = figma.variables.getVariableById(value.id);
          if (aliasTarget) {
            variable.setValueForMode(modeId, figma.variables.createVariableAlias(aliasTarget));
          } else {
            console.warn(`Alias target not found: ${value.id}`);
          }
        } else if (typeof value === 'string' && value.startsWith('#')) {
          variable.setValueForMode(modeId, hexToRgb(value));
        } else if (value !== undefined && value !== null) {
          variable.setValueForMode(modeId, value);
        }
      }
    }

    return { id: variable.id, name: variable.name };
  },

  // Delete a collection and all its variables
  delete_collection: ({ collectionId }) => {
    const collection = figma.variables.getVariableCollectionById(collectionId);
    if (!collection) return { success: false, reason: 'not found' };
    for (const varId of collection.variableIds) {
      const v = figma.variables.getVariableById(varId);
      if (v) v.remove();
    }
    collection.remove();
    return { success: true };
  },

  // Ping — confirms plugin is alive
  ping: () => ({ pong: true, timestamp: Date.now() })
};

// ── Message handler from UI ──
figma.ui.onmessage = async (msg) => {
  const { id, command, params } = msg;

  if (!command) return;

  try {
    const handler = handlers[command];
    if (!handler) throw new Error(`Unknown command: ${command}`);
    const result = await handler(params || {});
    figma.ui.postMessage({ id, success: true, result });
  } catch (err) {
    figma.ui.postMessage({ id, success: false, error: err.message });
  }
};
